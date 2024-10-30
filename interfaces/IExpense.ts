import Mongoose = require("mongoose");
interface IExpenseModel extends Mongoose.Document {
    amount: number;
    category: string;
    date: Date;
    description: string;
    userId: string;
}

export {IExpenseModel};