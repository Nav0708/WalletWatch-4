import Mongoose = require("mongoose");
interface IExpenseModel extends Mongoose.Document {
    expenseId: { type: String, unique: true },
    amount: number;
    categoryId: string;
    date: Date;
    description: string;
    userId: string;
}

export {IExpenseModel};