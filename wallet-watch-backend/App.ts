import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import {expenseRoutes} from './routes/expense_budgetRoutes';
import { ExpenseModel } from './model/Expense';
import { UserModel } from './model/User';
import { BudgetModel } from './model/Budget';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import GooglePassportObj from './GooglePassport';
import  passport from 'passport';
import { GoogleProfileModel } from './model/GoogleProfile';


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
// Creates and configures an ExpressJS web server.
class App {

    public expressApp: express.Application;
    public Expense: ExpenseModel;
    public User: UserModel;
    public googlePassportObj:GooglePassportObj;
    public  corsOptions = {
      origin: 'http://localhost:4200',
      methods: 'GET,POST,PUT,DELETE',  // Allow only certain methods
      allowedHeaders: 'Content-Type, Authorization',  // Allow only specific headers
      credentials: true, 
    }
    

    constructor(mongoDBConnection: string) {
        this.expressApp = express.default();
        this.googlePassportObj = new GooglePassportObj();
        this.Expense = new ExpenseModel(mongoDBConnection);
        this.User = new UserModel(mongoDBConnection);
        //this.User = new ConcreteUserModel(mongoDBConnection);
        this.expressApp.use(cors(this.corsOptions));
        this.middleware();
        this.routes();
        
      }
      // Configure Express middleware.
      private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(session({
          secret: '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',
          resave: true,
          saveUninitialized: true,
          cookie: { 
            httpOnly:true,
            secure: false }  // Set to true if using HTTPS
        }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(cors(this.corsOptions));
        this.expressApp.options('*', cors(this.corsOptions));
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
        this.expressApp.use((req, res, next) => {
        this.expressApp.options('*', (req, res) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.sendStatus(200);
          });
          next();
        });
      }
      private validateAuth(req: Request, res:Response, next: NextFunction):void {
        if (req.isAuthenticated()) { 
          return next(); }
        console.log("user is not authenticated");
        res.redirect('/');
      }

      private routes(): void {
        let router = express.Router();
        router.get('/auth/google', 
          passport.authenticate('google', {scope: ['email','profile']}));
      
          router.get('/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/' }),
            async (req, res) => {
              if (req.isAuthenticated()){
                const userData=req.user;
                const data = {
                  userId: req.user.id,
                  firstName: req.user.displayName,
                  lastName: req.user.familyName,
                  email: req.user!.emails ? req.user!.emails[0].value : '',
                  picture: req.user!.photos ? req.user!.photos[0].value : '',
                  
                };
                
                const user = await this.User.findOne(req.user.id);
                console.log
                
                if (user) {
                  console.log('User already exists. Updating info.',data);
                  await this.User.update(req.user.id, data);
                } else {
                  console.log('User does not exist. Creating new user.');
                  await this.User.create(data);
                }
                  console.log(`Session user: ${JSON.stringify(req.session)}`);
                  res.redirect('http://localhost:4200/homepage'); 
              } 
              else {
                res.send('User not authenticated');
                }
              }
          );

        router.post('/logout', this.validateAuth, (req: any, res, next) => {
            req.logout();
            req.clearCookie('WalletWatch-Cookie');
            req.session.destroy();
            res.status(200).redirect('http://localhost:4200/welcome');
          });
        router.post('/walletwatch/logs', (req, res) => {
            console.log(req.body.message);
            res.status(200).send('Log received');
        });
        router.get('/expenses', this.validateAuth, async (req: any, res) => {
            console.log(req.user.id);
        });

        router.get('/user', this.validateAuth, async (req: any, res) => {
          if (req.isAuthenticated()) {
            const userData = {
              displayName: req.user.displayName,
              userId: req.user.id,
              email: req.user.emails ? req.user.emails[0].value : '',
              photo: req.user.photos ? req.user.photos[0].value : ''
            };
            res.json(userData);
          } else {
            res.status(401).send('User not authenticated');
          }
        });
        router.post('/expenses', this.validateAuth, async (req: any, res) => {
          console.log(req.user.id);
          try {
            const { amount, description, categoryName } = req.body;
        
            // Use create() method to both instantiate and save the expense
            const newExpense = await this.Expense.model.create({
              userId: req.user.id,
              amount,
              description,
              categoryName,
              date: new Date(),
            });
        
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
        this.expressApp.use('/', router);
       // this.expressApp.use('/walletwatch/', expenseRoutes(this.Expense));
       //this.expressApp.use('/', router);
       //console.log(express.static(__dirname))
       //this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
       //this.expressApp.use('/images', express.static(__dirname+'/img'));
       //this.expressApp.use('/', express.static(__dirname+'/pages'));
    }
}

export {App};