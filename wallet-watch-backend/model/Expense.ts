import * as Mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import {IExpenseModel} from '../interfaces/IExpense';
 
 
// Class to manage the Expense model
class ExpenseModel {
    public schema: any;
    public model: any
    public dbConnectionString: string;
 
    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
 
    // Define the schema for Expense documents
    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                expenseId: { type: String, required:true },
                amount: { type: Number, required: true },
                categoryId: { type: String, ref: "Category", required: true },
                date: { type: Date, required: true },
                description: { type: String, required: true },
                userId: { type: String, required: true }
            },
            { collection: 'expenses' }
        );
    }
 
    // Create the Expense model and connect to MongoDB
    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IExpenseModel>("Expense", this.schema);
        } catch (e) {
            console.error(e);
        }
    }
 
    // Retrieve all expenses
    public async retrieveAllExpenses(response: any) {
        const query = this.model.find({}).populate("categoryId", "name").exec();
        try {
            const expenseArray = await query.exec();
            response.json(expenseArray);
        } catch (e) {
            console.error(e);
        }
    }
 
    // Retrieve expenses by a specific user ID
    public async retrieveExpensesByExpenseId(response: any, expenseId: string) {
        const query = this.model.find({ expenseId });
        try {
            const expenseArray = await query.exec();
            response.json(expenseArray);
        } catch (e) {
            console.error(e);
        }
    }
 
    // Retrieve expenses for a specific category
    public async retrieveExpensesByCategory(response: any, category: string) {
        const query = this.model.find({ category });
        try {
            const expenseArray = await query.exec();
            response.json(expenseArray);
        } catch (e) {
            console.error(e);
        }
    }
 
    // Retrieve expenses within a specific date range
    public async retrieveExpensesByDateRange(response: any, startDate: Date, endDate: Date) {
        const query = this.model.find({ date: { $gte: startDate, $lte: endDate } });
        try {
            const expenseArray = await query.exec();
            response.json(expenseArray);
        } catch (e) {
            console.error(e);
        }
    }
 
    // Count the total number of expense entries
    public async retrieveExpenseCount(response: any) {
        const query = this.model.estimatedDocumentCount();
        try {
            const numberOfExpenses = await query.exec();
            console.log("Number of expenses: " + numberOfExpenses);
            response.json(numberOfExpenses);
        } catch (e) {
            console.error(e);
        }
    }
}
 
export { ExpenseModel, IExpenseModel };