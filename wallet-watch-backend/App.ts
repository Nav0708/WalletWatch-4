import express from 'express';
import * as bodyParser from 'body-parser';
import {expenseRoutes} from './routes/expenseRoutes';
import {userRoutes} from './routes/userRoutes';
import { ExpenseModel } from './model/Expense';
import { UserModel } from './model/User';
import { BudgetModel } from './model/Budget';

// Creates and configures an ExpressJS web server.
class App {

    public expressApp: express.Application;
    public User: UserModel;
    public Expense: ExpenseModel;

    constructor(mongoDBConnection: string) {
        this.expressApp = express();
        this.Expense = new ExpenseModel(mongoDBConnection);
        this.User = new UserModel(mongoDBConnection);
        this.middleware();
        this.routes();
        
      }
      // Configure Express middleware.
      private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(async (req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });
      }
      private routes(): void {
      this.expressApp.use('/walletwatch/', userRoutes(this.User));
      this.expressApp.use('/walletwatch/', expenseRoutes(this.Expense));
    }
}

export {App};