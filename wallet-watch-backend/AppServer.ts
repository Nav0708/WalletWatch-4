import * as dotenv from 'dotenv';
import { App } from './App';
import mongoose from 'mongoose';
import express, { Express } from 'express';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'walletwatch';
const dbProtocol = process.env.DB_PROTOCOL || 'mongodb';

// Construct the MongoDB connection string based on authentication presence
let mongoDBConnection = `${dbProtocol}://`;
if (dbUser && dbPassword) {
  mongoDBConnection += `${dbUser}:${encodeURIComponent(dbPassword)}@`;
}
mongoDBConnection += `${dbHost}:${dbPort}/${dbName}`;

console.log("MongoDB connection string:", mongoDBConnection);  

// Configure and start the Express server
const server = new App(mongoDBConnection).expressApp;

mongoose
  .connect(mongoDBConnection)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(port, () => {
      console.log(`Node API app is running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB:', error);
  });
