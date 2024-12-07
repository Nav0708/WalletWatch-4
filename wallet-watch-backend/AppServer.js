"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
// Environment variables
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PROTOCOL, PORT } = process.env;
// Construct MongoDB URI
const MONGO_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
// Initialize Express App
const app = express();
const serverPort = PORT || 8080;
// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB successfully');
    // Wait for the connection to open
    const db = mongoose.connection.db;
    db.collection('expenses') // Replace with the name of your collection
        .find({})
        .toArray((err, documents) => {
        if (err) {
            console.error('Error fetching documents:', err);
        }
        else {
            console.log('Documents in the collection:', documents);
        }
    });
})
    .catch((err) => console.error('Error connecting to MongoDB:', err));
// Start the server
app.listen(serverPort, () => {
    console.log(`Server running on http://localhost:${serverPort}`);
});
// require('dotenv').config();
// const mongoose = require('mongoose');
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PROTOCOL } = process.env;
// // Construct MongoDB URI
// const MONGO_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
// // Connect to MongoDB
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log('Connected to MongoDB successfully'))
//   .catch((err: any) => console.error('Error connecting to MongoDB:', err));
//old
// import * as dotenv from 'dotenv';
// import { App } from './App';
// import mongoose from 'mongoose';
// import express, { Express } from 'express';
// // Load environment variables from .env file
// dotenv.config();
// const app: Express = express();
// const port = process.env.PORT || '';
// const dbUser = process.env.DB_USER || '';
// const dbPassword = process.env.DB_PASSWORD || '';
// const dbHost = process.env.DB_HOST || '';
// const dbPort = process.env.DB_PORT || '';
// const dbName = process.env.DB_NAME || '';
// const dbProtocol = process.env.DB_PROTOCOL || '';
// // Construct the MongoDB connection string based on authentication presence
// let mongoDBConnection = `${dbProtocol}://`;
// if (dbUser && dbPassword) {
//   mongoDBConnection += `${dbUser}:${encodeURIComponent(dbPassword)}@`;
// }
// mongoDBConnection += `${dbHost}:${dbPort}/${dbName}`;
// console.log("MongoDB connection string:", mongoDBConnection);  
// // Configure and start the Express server
// const server = new App(mongoDBConnection).expressApp;
// mongoose
//   .connect(mongoDBConnection)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     server.listen(port, () => {
//       console.log(`Node API app is running on port ${port}`);
//     });
//   })
//   .catch((error: Error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });
