import { v4 as uuidv4 } from 'uuid';
import Mongoose = require("mongoose");


interface IExpenseModel extends Mongoose.Document {
    expenseId: String;
    amount: number;
    categoryId: string;
    date: Date;
    description: string;
    userId: string;
}

export {IExpenseModel};