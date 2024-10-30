db = db.getSiblingDB('walletWatch')
db.createCollection('budgets')
budgetsCollection = db.getCollection("budgets")
budgetsCollection.remove({})
budgetsCollection.insert(
{
    amount: 1000,
    startDate: 20/10/2024,
    endDate: 31/10/2024,
    userId: 1,
}
)
budgetsCollection.insert(
{
    amount: 1000,
    startDate: 1/11/2024,
    endDate: 15/11/2024,
    userId: 1,
}
)

