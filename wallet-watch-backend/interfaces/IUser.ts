import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userID: string;
    username: string;
    password: string;
    role: string;
}
export {IUserModel};