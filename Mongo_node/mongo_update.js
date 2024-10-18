let {MongoClient, ObjectId} = require('mongodb');
const url = "mongodb://localhost:27017";

const clientObj = new MongoClient (url);
async function updateData(){
    try {
        const db = clientObj.db("vedant");
        const find = db.collection("find");
        const findData = {$set:{Salary:4000000}};
        const condition = { _id: new ObjectId('66b49ac88d55efca60228fb5')};
        const result = await find.updateOne(condition,findData);
        console.log('Data Updated'+result);
    }
    catch(err){
        console.log(err);
    }
    finally{
        clientObj.close();
    }
} 
updateData();