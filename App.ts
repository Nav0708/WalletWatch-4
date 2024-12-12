import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import {expenseRoutes} from './routes/expense_budgetRoutes';
import { ExpenseModel } from './model/Expense';
import { UserModel } from './model/User';
import { CategoryModel } from './model/Category';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import GooglePassportObj from './GooglePassport';
import  passport from 'passport';
import { GoogleProfileModel } from './model/GoogleProfile';
import cors from 'cors';
import crypto from 'crypto';
import * as path from 'path';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

declare global {
  namespace Express {
    interface User {
      id: string;
      displayName: string;
      familyName: string;
      emails?: { value: string }[];
      photos?: { value: string }[];
    }
  }
}
declare global {
  namespace Express {
    interface Session {
      us?: UserModel;  
    }
  }
}
///Adding comment for git debugs
// Creates and configures an ExpressJS web server.
class App {

    public expressApp: express.Application;
    public Expense: ExpenseModel;
    public User: UserModel;
    public Category: CategoryModel;
    public googlePassportObj:GooglePassportObj;
    public  corsOptions = {
      origin: '*',
      methods: 'GET,POST,PUT,DELETE',  // Allow only certain methods
      allowedHeaders: 'Content-Type, Authorization',  // Allow only specific headers
      credentials: true, 
    }/****Changing this as a part of Azure config*****/
    

    constructor(mongoDBConnection: string) {
        this.expressApp = express();
        this.googlePassportObj = new GooglePassportObj();
        this.Expense = new ExpenseModel(mongoDBConnection);
        this.User = new UserModel(mongoDBConnection);
        this.Category = new CategoryModel(mongoDBConnection);
        //this.User = new ConcreteUserModel(mongoDBConnection);
        this.expressApp.use(cors(this.corsOptions));
        this.middleware();
        this.routes();
        
      }
      // Configure Express middleware.
      private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
          );
          next();
        });
        this.expressApp.use(session({ secret: "keyboard cat" }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
      }

      private validateAuth(req: Request, res: Response, next: NextFunction): void {
        if (req.isAuthenticated()) {
          console.log(`user is authenticated for ${req.path}`);
          return next();
        }
        console.log("user is not authenticated");
        res.redirect("/#/");
      }
      
      private getUserId(req: Request): string {
        return req.user?.id || ""; // Safely access `id` with optional chaining
      }

      private routes(): void {
        let router = express.Router();
        // router.get('/welcome', (req, res)=>{
        //   res.status(200).send('Welcome to the app!');
        // })
        router.get('/auth/google', 
          //passport.authenticate('google', {scope: ['email','profile'],prompt: 'select_account'}));
          passport.authenticate('google', {scope: ['email','profile']}));
          
          router.get('/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/#/homepage' }),
            async (req, res) => {
              const userData=req.user;
              if (userData){
                const data = {
                  userId: userData.id,
                  displayName: userData.displayName,
                  email: userData!.emails ? userData!.emails[0].value : '',
                  picture: userData!.photos ? userData!.photos[0].value : '',
                  
                };
                
                const user = await this.User.findOne(userData.id);
                console.log("Fine one user",user);
                
                if (user.length>0) {
                  console.log('User already exists. Updating info.',data);
                  await this.User.update(userData.id, data);
                } else {
                  console.log('User does not exist. Creating new user.');
                  await this.User.create(data);
                }
                  //res.redirect('http://localhost:4200/homepage'); 
                  res.redirect('/#/homepage');/****Changing this as a part of Azure config*****/
              } 
              else {
                res.send('User not authenticated');
                }
              }
          );

        router.post('/logout', this.validateAuth, (req: any, res, next) => {
            req.logout();
            //req.clearCookie('WalletWatch-Cookie');
            res.clearCookie('connect.sid', { path: '/' });

            req.user.destroy();
            //res.status(200).redirect('http://localhost:4200/welcome');
            res.status(200).redirect('/#/welcome');/****Changing this as a part of Azure config*****/
            
          });
        router.post('/logs', (req, res) => {
            console.log(req.body.message);
            res.status(200).send('Log received');
        });
        // router.get('/expenses', this.validateAuth, async (req: any, res) => {
        //     console.log(req.user.id);
        // });

        router.get('/user', this.validateAuth, async (req: any, res) => {
          if (req.user) {
            const userData = {
              displayName: req.user.displayName,
              userId: req.user.id,
              email: req.user.emails ? req.user.emails[0].value : '',
              picture: req.user.photos ? req.user.photos[0].value : ''
            };
            res.json(userData);
          } else {
            res.status(401).send('User not authenticated');
          }
        });
        
      router.post('/expenses', this.validateAuth, async (req: any, res) => {
        const expenseId = crypto.randomBytes(16).toString("hex");
        console.log(req.user.id);
        console.log("hi adding expenses")
        try {
          const { amount, description, categoryName } = req.body;
      
          // Use create() method to both instantiate and save the expense
          const newExpense = await this.Expense.model.create({
            
            expenseId,
            userId: req.user.id,
            amount,
            description,
            categoryName,
            date: new Date(),
          });
          // Save the new expense to the database
          await newExpense.save();
          
          res.status(201).send('Expense added successfully');
        } catch (error) {
          console.error('Error adding expense:', error);
          res.status(500).send('Failed to add expense');
        }
    });

    router.get('/expenses', this.validateAuth, async (req: any, res: Response) => {
      try {
        // Retrieve all expenses for the authenticated user
        const expenses = await this.Expense.model.find({ userId: req.user.id });
    
        // Return the expenses to the client
        res.status(200).json(expenses);
      } catch (error) {
        console.error('Error retrieving expenses:', error);
        res.status(500).send('Failed to retrieve expenses');
      }
    });

    // Get expenses for a specific user
    router.get('/expenses/user/:userId', async (req, res) => {
      const { userId } = req.params;
      try {
        const expenses = await this.Expense.model.find({ userId });  // Filter expenses by userId
        res.json(expenses);  // Send the filtered expenses
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching expenses' });
      }
    });

    router.get('/expenses/:expenseId', async (req, res) => {
      const { expenseId } = req.params;
      try {
        const expense = await this.Expense.model.findOne({ expenseId }); // Find by expenseId
        if (!expense) {
           res.status(404).json({ message: 'Expense not found' });
        }
        res.json(expense);
      } catch (error) {
        console.error('Error fetching expense:', error);
        res.status(500).json({ message: 'Error fetching expense' });
      }
    });

    router.delete('/expenses/:expenseId', this.validateAuth, async (req, res) => {
      const { expenseId } = req.params;
      try {
        const expense = await this.Expense.model.findOneAndDelete({ expenseId });
        if (!expense) {
          res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
      } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Error deleting expense' });
      }
    });
    
    //update the individual expense 
    router.put('/expenses/:expenseId', async (req, res) => {
      const { expenseId } = req.params;
      const updatedData = req.body;
    
      try {
        const updatedExpense = await this.Expense.model.findOneAndUpdate(
          { expenseId },
          updatedData,
          { new: true } // Return the updated document
        );
        if (!updatedExpense) {
          res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(updatedExpense);
      } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Error updating expense' });
      }
    });

    router.post('/categories', async (req: any, res) => {
 
      console.log("Adding categorise")
      try {
        const { categoryId, categoryName,categoryDescription } = req.body;
   
        // Use create() method to both instantiate and save the expense
        const newCategory = await this.Category.model.create({
          categoryId,
          categoryName,
          categoryDescription,
        });
        // Save the new expense to the database
        await newCategory.save();
       
        res.status(201).json({catId: categoryId,
          message: 'Category created successfully'
        });
      } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).send('Failed to add category');
      }
  });
    
 
       
        this.expressApp.use("/", router);
        this.expressApp.use(express.static(path.join(__dirname, 'dist/wallet-watch')));
    // this.expressApp.use("/jquery",express.static(__dirname + "/node_modules/jquery/dist/jquery.min.js"));
        this.expressApp.use("/bootstrap/css",express.static(__dirname + "/node_modules/bootstrap/dist/css/bootstrap.min.css"));
        this.expressApp.use("/bootstrap/js",express.static(__dirname + "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"));
        this.expressApp.use("/",express.static(__dirname + "/dist/wallet-watch/browser"));
        this.expressApp.use(express.static(path.join(__dirname, 'dist/wallet-watch')));
        this.expressApp.get('*', (req, res) => {res.sendFile(path.join(__dirname, 'dist/wallet-watch/browser/index.html'));});
    }
}

export {App};


//testing deployment