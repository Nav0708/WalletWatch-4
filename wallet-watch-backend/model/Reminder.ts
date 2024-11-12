import * as Mongoose from "mongoose";
import { IReminderModel } from '../interfaces/IReminder';
import { v4 as uuidv4 } from 'uuid';

// Class to manage the Reminder model
class ReminderModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(DB_CONNECTION_STRING: string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    // Define the schema for Reminder documents
    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                reminderId: { type: String, default: uuidv4, required: true },
                type: { type: String, required: true },
                reminderDate: { type: Date, required: true },
                status: { type: String, required: true }
            },
            { collection: 'reminders' }
        );
    }

    // Create the Reminder model and connect to MongoDB
    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IReminderModel>("Reminder", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve all reminders
    public async retrieveAllReminders(response: any) {
        const query = this.model.find({});
        try {
            const reminderArray = await query.exec();
            response.json(reminderArray);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve a reminder by its ID
    public async retrieveReminderById(response: any, reminderId: string) {
        const query = this.model.findOne({ reminderId });
        try {
            const reminder = await query.exec();
            response.json(reminder);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve reminders by type
    public async retrieveRemindersByType(response: any, type: string) {
        const query = this.model.find({ type });
        try {
            const reminderArray = await query.exec();
            response.json(reminderArray);
        } catch (e) {
            console.error(e);
        }
    }

    // Retrieve reminders by status
    public async retrieveRemindersByStatus(response: any, status: string) {
        const query = this.model.find({ status });
        try {
            const reminderArray = await query.exec();
            response.json(reminderArray);
        } catch (e) {
            console.error(e);
        }
    }

    // Count the total number of reminder entries
    public async retrieveReminderCount(response: any) {
        const query = this.model.estimatedDocumentCount();
        try {
            const numberOfReminders = await query.exec();
            console.log("Number of reminders: " + numberOfReminders);
            response.json(numberOfReminders);
        } catch (e) {
            console.error(e);
        }
    }
}

export { ReminderModel, IReminderModel };
