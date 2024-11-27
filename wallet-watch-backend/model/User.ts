import * as Mongoose from "mongoose";
import { IUserModel } from '../interfaces/IUser';

//User model
class UserModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    // Define the schema for User documents
    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                userId: { type: String, required: true },
                userName: { type: String },
                email: { type: String },
                hashed_pswd: { type: String, required: true },
                hints: { type: String, required: true }
            },
            { collection: 'users' }
        );
    }

    // Create the User model and connect to MongoDB
    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IUserModel>("User", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve all users
    public async retrieveAllUsers(response: any) {
        const query = this.model.find({});
        try {
            const userArray = await query.exec();
            response.json(userArray);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve a user by a specific user ID
    public async retrieveUserByUserId(response: any, userId: string) {
        const query = this.model.findOne({ userId });
        try {
            const user = await query.exec();
            response.json(user);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve a user by email
    public async retrieveUserByEmail(response: any, email: string) {
        const query = this.model.findOne({ email });
        try {
            const user = await query.exec();
            response.json(user);
        } catch (e) {
            console.error(e);
        }
    }

    // Count the total number of user entries
    public async retrieveUserCount(response: any) {
        const query = this.model.estimatedDocumentCount();
        try {
            const numberOfUsers = await query.exec();
            console.log("Number of users: " + numberOfUsers);
            response.json(numberOfUsers);
        } catch (e) {
            console.error(e);
        }
    }
}

export { UserModel, IUserModel };
