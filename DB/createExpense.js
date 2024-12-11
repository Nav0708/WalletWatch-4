db = db.getSiblingDB('WalletWatch-4')
db.createCollection('expenses')
expensesCollection = db.getCollection("expenses")
expensesCollection.remove({})
expensesCollection.insert(
{
    expenseId: 1,
    amount: 100,
    categoryName: "food",
    date: 29/10/2024,
    description: "pizza",
    userId: 1
}
)
expensesCollection.insert(
{
    expenseId: 2,
    amount: 200,
    categoryName: "food",
    date: 29/10/2024,
    description: "rent",
    userId: 1
}
)
expensesCollection.insert(
{
    expenseId: 3,
    amount: 300,
    categoryName: "food",
    date: 29/10/2024,
    description: "electricity",
    userId: 5
}
)
