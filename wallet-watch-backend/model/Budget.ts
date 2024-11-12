import * as Mongoose from "mongoose";
import { IBudgetModel } from '../interfaces/IBudget';
import { v4 as uuidv4 } from 'uuid';

// Class to manage the Budget model
class BudgetModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    // Define the schema for Budget documents
    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                budgetId: { type: String, required: true },
                amount: { type: Number, required: true },
                category: { type: String, required: true },
                date: { type: Date, required: true },
                description: { type: String, required: true },
                userId: { type: String, required: true }
            },
            { collection: 'budgets' }
        );
    }

    // Create the Budget model and connect to MongoDB
    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IBudgetModel>("Budget", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve all budgets
    public async retrieveAllBudgets(response: any) {
        const query = this.model.find({});
        try {
            const budgetArray = await query.exec();
            response.json(budgetArray);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve budgets by a specific user ID
    public async retrieveBudgetsByUserId(response: any, userId: string) {
        const query = this.model.find({ userId });
        try {
            const budgetArray = await query.exec();
            response.json(budgetArray);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve budgets by a specific category
    public async retrieveBudgetsByCategory(response: any, category: string) {
        const query = this.model.find({ category });
        try {
            const budgetArray = await query.exec();
            response.json(budgetArray);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve budgets within a specific date range
    public async retrieveBudgetsByDateRange(response: any, startDate: Date, endDate: Date) {
        const query = this.model.find({ date: { $gte: startDate, $lte: endDate } });
        try {
            const budgetArray = await query.exec();
            response.json(budgetArray);
        } catch (e) {
            console.error(e);
        }
    }

    // Count the total number of budget entries
    public async retrieveBudgetCount(response: any) {
        const query = this.model.estimatedDocumentCount();
        try {
            const numberOfBudgets = await query.exec();
            console.log("Number of budgets: " + numberOfBudgets);
            response.json(numberOfBudgets);
        } catch (e) {
            console.error(e);
        }
    }
}

export { BudgetModel, IBudgetModel };
