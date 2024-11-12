import * as Mongoose from "mongoose";
import { ICategoryModel } from '../interfaces/ICategory';
import { v4 as uuidv4 } from 'uuid';

// Class to manage the Category model
class CategoryModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    // Define the schema for Category documents
    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                categoryId: { type: String, default: uuidv4, required: true },
                name: { type: String, required: true, unique: true }
            },
            { collection: 'categories' }
        );
    }

    // Create the Category model and connect to MongoDB
    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<ICategoryModel>("Category", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve all categories
    public async retrieveAllCategories(response: any) {
        const query = this.model.find({});
        try {
            const categoryArray = await query.exec();
            response.json(categoryArray);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve a category by its ID
    public async retrieveCategoryById(response: any, categoryId: string) {
        const query = this.model.findOne({ categoryId });
        try {
            const category = await query.exec();
            response.json(category);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve a category by name
    public async retrieveCategoryByName(response: any, name: string) {
        const query = this.model.findOne({ name });
        try {
            const category = await query.exec();
            response.json(category);
        } catch (e) {
            console.error(e);
        }
    }

    // Count the total number of category entries
    public async retrieveCategoryCount(response: any) {
        const query = this.model.estimatedDocumentCount();
        try {
            const numberOfCategories = await query.exec();
            console.log("Number of categories: " + numberOfCategories);
            response.json(numberOfCategories);
        } catch (e) {
            console.error(e);
        }
    }
}

export { CategoryModel, ICategoryModel };
