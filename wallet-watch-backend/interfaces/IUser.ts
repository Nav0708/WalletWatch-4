import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: string;
    displayName: string;
    picture: string;
    email: string;
}
export {IUserModel};