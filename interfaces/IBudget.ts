import Mongoose = require("mongoose");
interface IBudgetModel extends Mongoose.Document {
    BudgetId: string;
    amount: number;
    category: string;
    date: Date;
    description: string;
    userId: string;
}
 
export {IBudgetModel};
