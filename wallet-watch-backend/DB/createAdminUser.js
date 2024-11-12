db = db.getSiblingDB('admin')
db.createUser(
{
	user: "anushap", 
	pwd: "walletwatch",
	roles: [ "readWriteAnyDatabase", "dbAdminAnyDatabase"]	
}
)