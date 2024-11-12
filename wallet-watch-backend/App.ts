import express from 'express';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import {expenseRoutes} from './routes/expenseRoutes';
import * as crypto from 'crypto';
import { ExpenseModel } from './model/Expense';

// Creates and configures an ExpressJS web server.
class App {

    public expressApp: express.Application;
    public Expense: ExpenseModel;

    constructor(mongoDBConnection: string) {
        this.expressApp = express();
        this.Expense = new ExpenseModel(mongoDBConnection);
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
      this.expressApp.use('/walletwatch/', expenseRoutes(this.Expense));
    }
}

export {App};