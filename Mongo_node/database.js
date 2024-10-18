let { MongoClient, ObjectId } = require('mongodb');
const url = "mongodb://localhost:27017";
const clientObj = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
    try {
        await clientObj.connect();  // Wait for the client to connect
        db = clientObj.db("vedant");  // Connect to the specific database
        console.log("Connected to database vedant");
    } catch (err) {
        console.log("Failed to connect to the database:", err);
        throw err;  // Re-throw the error after logging it
    }
}

connectDB();  // Call the function to establish the connection

module.exports = { db, ObjectId };  // Export the connected database object and ObjectId
