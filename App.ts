import express from 'express';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import expenseRoutes from './routes/expenseRoutes';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

    public expressApp: express.Application;

    constructor() {
        this.expressApp = express();
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
      //   let router = express.Router();
      //   router.post('/expenses', async (req, res) => {
      //     const id = crypto.randomBytes(16).toString("hex");
      //     console.log(req.body);

      // });
      
      
      // // Handle fetching expenses
      // router.get('/expenses', async (req, res) => {
          
      // });

      this.expressApp.use('/', expenseRoutes);
      //this.expressApp.use('/api', expenseRoutes);
      
      
    }
}

export {App};