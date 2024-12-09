import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}
export {IUserModel};