"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const App_1 = require("./App");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
// Load environment variables from .env file
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || '';
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || '';
const dbPort = process.env.DB_PORT || '';
const dbName = process.env.DB_NAME || '';
const dbProtocol = process.env.DB_PROTOCOL || '';
// Construct the MongoDB connection string based on authentication presence
let mongoDBConnection = `${dbProtocol}://`;
if (dbUser && dbPassword) {
    mongoDBConnection += `${dbUser}:${encodeURIComponent(dbPassword)}@`;
}
mongoDBConnection += `${dbHost}:${dbPort}/${dbName}`;
console.log("MongoDB connection string:", mongoDBConnection);
// Configure and start the Express server
const server = new App_1.App(mongoDBConnection).expressApp;
mongoose_1.default
    .connect(mongoDBConnection)
    .then(() => {
    console.log('Connected to MongoDB');
    server.listen(port, () => {
        console.log(`Node API app is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
