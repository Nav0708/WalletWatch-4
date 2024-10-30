db = db.getSiblingDB('walletWatch')
db.createCollection('reminders')
remindersCollection = db.getCollection("reminders")
remindersCollection.remove({})
remindersCollection.insert(
{
    message: "Electricity bill is due on October 31,2024",
    date: 28/10/2024,
    userId: 1
}
)
remindersCollection.insert(
{
    message: "Add Budget before adding expenses",
    date: 29/10/2024,
    userId: 2
}
)

