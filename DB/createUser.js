db = db.getSiblingDB('walletWatch')
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
{
    name: "Anusha",
    email: "apanta@seattleu.edu",
    password: "anusha",
}
)
usersCollection.insert(
{
    name: "Atharva",
    email: "ajagtap@seattleu.edu",
    password: "atharva",
}
)
usersCollection.insert(
{
    name: "Navami",
    email: "nbhat@seattleu.edu",
    password: "navami",
}
)
usersCollection.insert(
{
    name: "Padmaja",
    email: "pbuggaveeti@seattleu.edu",
    password: "padmaja",
}
)