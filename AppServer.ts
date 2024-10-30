import * as dotenv from 'dotenv';
import {App} from './App';
import mongoose from 'mongoose';
import express, { Express } from 'express';

dotenv.config();
const port = process.env.PORT;
const app: Express = express();
const PORT = 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbInfo = process.env.DB_INFO||'';
console.log("DB_USER:", dbUser);
console.log("DB_PASSWORD:", dbPassword);
//const MONGO_URI='mongodb+srv://anusha:<anusha>@walletwatch.dx7bv.mongodb.net/?retryWrites=true&w=majority&appName=Walletwatch';
const mongoDBConnection =`mongodb://${dbUser}:${encodeURIComponent(dbPassword)}${dbInfo}`;

let server: any = new App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);

mongoose
  .connect(mongoDBConnection)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB:', error);
  });
