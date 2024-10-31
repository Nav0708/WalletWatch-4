db = db.getSiblingDB('walletWatch')
db.createCollection('expenses')
expensesCollection = db.getCollection("expenses")
expensesCollection.remove({})
expensesCollection.insert(
{
    expenseId: 1,
    amount: 100,
    categoryId: 1,
    date: 29/10/2024,
    description: "pizza",
    userId: 1
}
)
expensesCollection.insert(
{
    expenseId: 2,
    amount: 200,
    categoryId: 2,
    date: 29/10/2024,
    description: "rent",
    userId: 1
}
)
expensesCollection.insert(
{
    expenseId: 3,
    amount: 300,
    categoryId: 1,
    date: 29/10/2024,
    description: "electricity",
    userId: 5
}
)
