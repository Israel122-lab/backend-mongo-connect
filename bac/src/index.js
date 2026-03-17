const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");

const dotenv = require("dotenv");
dotenv.config({
    path: './.env'
})
const connectToDB = require("./config/database.js");
const app = require("./app.js");


const startServer = async ()=> {
    try {
        console.log('mongo_uri=', process.env.MONGODB_URI)

        await connectToDB();
        app.on('error', (error) => {
            console.error('Server error:', error);
        });
        app.listen(process.env.PORT || 4000, () => {
            console.log(`server is listening on port ${process.env.PORT || 4000}`);
        });
    } catch (error) {
        console.error('Error starting server:', error)
    }
}

startServer();