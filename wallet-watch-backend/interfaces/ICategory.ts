import Mongoose = require("mongoose");
interface ICategoryModel extends Mongoose.Document {
    categoryId: string;
    name: string;
}
 
export {ICategoryModel};