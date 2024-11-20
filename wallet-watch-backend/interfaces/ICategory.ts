import Mongoose = require("mongoose");
interface ICategoryModel extends Mongoose.Document {
    categoryId: string;
    categoryName: string;
}
 
export {ICategoryModel};