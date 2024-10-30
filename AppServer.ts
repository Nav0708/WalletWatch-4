import * as dotenv from 'dotenv';
import {App} from './App';

dotenv.config();
const port = process.env.PORT;

let server: any = new App().expressApp;
server.listen(port);
console.log("server running in port " + port);

import mongoose from 'mongoose';
import express, { Express } from 'express';

const app: Express = express();
const PORT = 3000;
const MONGO_URI='mongodb+srv://anusha:<anusha>@walletwatch.dx7bv.mongodb.net/?retryWrites=true&w=majority&appName=Walletwatch';


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB:', error);
  });
