import Mongoose = require("mongoose");
interface IReminderModel extends Mongoose.Document {
    reminderId: string;
    type: string;
    reminderDate: Date;
    status: string
}
 
export {IReminderModel};