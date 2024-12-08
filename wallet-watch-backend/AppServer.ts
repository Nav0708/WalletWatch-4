import * as dotenv from 'dotenv';
import { App } from './App';

dotenv.config();

const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD||'';
const dbProtocol = process.env.DB_PROTOCOL||'';
const dbCluster = process.env.DB_CLUSTER||'';
const dbName = process.env.DB_NAME||'';

const mongoDBConnection = `${dbProtocol}${dbUser}:${encodeURIComponent(dbPassword)}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;
console.log("server db connection URL " + mongoDBConnection);
//mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority

const server = new App(mongoDBConnection).expressApp;
server.listen(port || 8080, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Server MongoDB string ${mongoDBConnection}`);
});