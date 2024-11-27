import Mongoose = require("mongoose");
interface IUserModel extends Mongoose.Document {
    userId: string,
    userName: string,
    email: string ,
    hashed_pswd: string,
    hints: string,
}
 
export {IUserModel};