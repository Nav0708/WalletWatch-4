import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import {expenseRoutes} from './routes/expenseRoutes';
import {userRoutes} from './routes/userRoutes';
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
      id: string,
      displayName: string,
    }
  }
}

class ConcreteUserModel extends UserModel {
  constructor(DB_CONNECTION_STRING: string) {
    super(DB_CONNECTION_STRING);
  }
}
// Creates and configures an ExpressJS web server.
class App {

    public expressApp: express.Application;
    public User: UserModel;
    public Expense: ExpenseModel;
    public googlePassportObj:GooglePassportObj;
    

    constructor(mongoDBConnection: string) {
        this.expressApp = express.default();
        this.googlePassportObj = new GooglePassportObj();
        this.Expense = new ExpenseModel(mongoDBConnection);
        //this.User = new UserModel(mongoDBConnection);
        this.User = new ConcreteUserModel(mongoDBConnection);
        this.middleware();
        this.routes();
        
      }
      // Configure Express middleware.
      private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(session({ secret: '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' }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
        this.expressApp.use((req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });
      }
      private validateAuth(req: Request, res:Response, next: NextFunction):void {
        if (req.isAuthenticated()) { 
          console.log("user is authenticated"); 
          console.log(JSON.stringify(req.user));
          return next(); }
        console.log("user is not authenticated");
        res.redirect('/');
      }

      private routes(): void {
        let router = express.Router();
        router.get('/auth/google', 
          passport.authenticate('google', {scope: ['email','profile']}));
      
        router.get('/auth/google/callback', 
            passport.authenticate('google', 
              { failureRedirect: '/' }
            ),
            (req, res) => {
              console.log("successfully authenticated user and returned to callback page.");
              console.log("redirecting to Welcome page");
              res.redirect('http://localhost:4200/#/welcome');
            }
        );
        router.post('/logout', this.validateAuth, (req: any, res, next) => {
            req.logout();
            res.clearCookie('WalletWatch-Cookie');
            req.session.destroy();
            res.status(200).redirect('/');
          });
        router.post('/wallet-watch/logs', (req, res) => {
            console.log(req.body.message);
            res.status(200).send('Log received');
        });
        
        this.expressApp.use('/', router);
        this.expressApp.use('/walletwatch/', userRoutes(this.User));
        this.expressApp.use('/walletwatch/', expenseRoutes(this.Expense));
    }
}

export {App};