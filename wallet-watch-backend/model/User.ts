import * as Mongoose from "mongoose";
import { IUserModel } from '../interfaces/IUser';

abstract class UserModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema({
            userID: String,
            username: String,
            password: String,
            email: String,
            role: String,
        }, { collection: 'users' });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true}as any);
            this.model = Mongoose.model<IUserModel>('User', this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async changePassword(response: any, userID: String, newPassword: string): Promise<void> {
        // Hash the new password before saving to the database
        try {
            const result = await this.model.updateOne({ userID: userID }, { password: newPassword });
            if (result.nModified === 1) {
                response.json({ message: "User password changed successfully." });
            } else {
                response.status(404).send("User not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500);
        }
    }

    public async deleteAccount(response: any, userID: String): Promise<void> {
        try {
            const result = await this.model.deleteOne({ userID: userID });
            if (result.deletedCount === 1) {
                response.json({ message: "User account deleted successfully." });
            } else {
                response.status(404).send("User not found.");
            }
        } catch (e) {
            console.error(e);
            response.status(500);
        }
    }
}
export {UserModel};