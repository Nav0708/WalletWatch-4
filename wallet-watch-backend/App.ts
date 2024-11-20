import express from 'express';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import {expenseRoutes} from './routes/expenseRoutes';
import * as crypto from 'crypto';
import { ExpenseModel } from './model/Expense';
import { categoryRoutes } from './routes/categoryRoutes';
import { CategoryModel } from './model/Category';

// Creates and configures an ExpressJS web server.
class App {

    public expressApp: express.Application;
    public Expense: ExpenseModel;
    public Category: CategoryModel;

    constructor(mongoDBConnection: string) {
        this.expressApp = express();
        this.Expense = new ExpenseModel(mongoDBConnection);
        this.Category = new CategoryModel(mongoDBConnection);
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
      this.expressApp.use('/walletwatch/', categoryRoutes(this.Category));
    }
}

export {App};