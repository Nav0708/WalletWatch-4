import * as Mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import {IUserModel} from '../interfaces/IUser';
 
 
// Class to manage the Expense model
class UserModel {

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
                userId: { type: String },
                firstName: { type: String},
                lastName: { type: String },
                email: { type: String},
                picture: { type: String},
            },
            { collection: 'user' }
        );
    }
 
    // Create the Expense model and connect to MongoDB
    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IUserModel>("User", this.schema);
        } catch (e) {
            console.error(e);
        }
    }
 
  // Method to find a user by userId
  public async findOne(id: string){
    return await this.model.find({ userId: id }).exec();
  }

  // Method to create a new user
  public async create(data: any) {
    const newUser = new this.model(data);
    return newUser.save();
  }

  // Method to update user data
  public async update(userId: string, data: any){
    return await this.model.findOneAndUpdate({ userId }, data, { new: true });
  }
}

export { IUserModel, UserModel };
