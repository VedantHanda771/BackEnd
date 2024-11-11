const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017"; // Change this if necessary
const clientObj = new MongoClient(url);

async function connectToDatabase() {
  try {
    await clientObj.connect();
    console.log("Connected to MongoDB");
    return clientObj.db("multerProject");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw error;
  }
}

function closeDatabase() {
  return clientObj.close();
}

module.exports = { connectToDatabase, closeDatabase };
