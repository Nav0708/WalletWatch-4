db = db.getSiblingDB('WalletWatch-4')
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
{
    userId:1,
    name: "Anusha",
    email: "apanta@seattleu.edu",
    password: "anusha",
}
)
usersCollection.insert(
{
    userId:1,
    name: "Atharva",
    email: "ajagtap@seattleu.edu",
    password: "atharva",
}
)
usersCollection.insert(
{
    userId:1,
    name: "Navami",
    email: "nbhat@seattleu.edu",
    password: "navami",
}
)
usersCollection.insert(
{
    userId:1,
    name: "Padmaja",
    email: "pbuggaveeti@seattleu.edu",
    password: "padmaja",
}
)