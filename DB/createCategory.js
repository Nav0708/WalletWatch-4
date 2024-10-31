db = db.getSiblingDB('WalletWatch-4')
db.createCollection('categories')
categoriesCollection = db.getCollection("categories")
categoriesCollection.remove({})
categoriesCollection.insert(
{
    categoryName: "Grocery",
}
)
categoriesCollection.insert(
{
    categoryName: "Rent",
}
)
categoriesCollection.insert(
{
    categoryName: "Entertainment",
}
)
categoriesCollection.insert(
{
    categoryName: "Personal Stuffs",
}
)
categoriesCollection.insert(
{
    categoryName: "Utilities",
}
)