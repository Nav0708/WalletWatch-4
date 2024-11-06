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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModel = void 0;
const Mongoose = __importStar(require("mongoose"));
// Class to manage the Expense model
class ExpenseModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    // Define the schema for Expense documents
    createSchema() {
        this.schema = new Mongoose.Schema({
            expenseId: { type: String, required: true },
            amount: { type: Number, required: true },
            categoryId: { type: String, required: true },
            date: { type: Date, required: true },
            description: { type: String, required: true },
            userId: { type: String, required: true }
        }, { collection: 'expenses' });
    }
    // Create the Expense model and connect to MongoDB
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("Expense", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    // Retrieve all expenses
    retrieveAllExpenses(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({});
            try {
                const expenseArray = yield query.exec();
                response.json(expenseArray);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    // Retrieve expenses by a specific user ID
    retrieveExpensesByExpenseId(response, expenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({ expenseId });
            try {
                const expenseArray = yield query.exec();
                response.json(expenseArray);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    // Retrieve expenses for a specific category
    retrieveExpensesByCategory(response, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({ category });
            try {
                const expenseArray = yield query.exec();
                response.json(expenseArray);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    // Retrieve expenses within a specific date range
    retrieveExpensesByDateRange(response, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({ date: { $gte: startDate, $lte: endDate } });
            try {
                const expenseArray = yield query.exec();
                response.json(expenseArray);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    // Count the total number of expense entries
    retrieveExpenseCount(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.estimatedDocumentCount();
            try {
                const numberOfExpenses = yield query.exec();
                console.log("Number of expenses: " + numberOfExpenses);
                response.json(numberOfExpenses);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.ExpenseModel = ExpenseModel;
