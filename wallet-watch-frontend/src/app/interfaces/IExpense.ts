export interface IExpenseModel {
    expenseId: string;
    amount: number;
    categoryName: string;
    date: Date | string;
    description: string;
    userId: string;
}
