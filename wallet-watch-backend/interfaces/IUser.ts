import Mongoose = require("mongoose");
interface IUserModel extends Mongoose.Document {
    userId: string;
    name: string;
    email: string;
    password: string
}
 
export {IUserModel};