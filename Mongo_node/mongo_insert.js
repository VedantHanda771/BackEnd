let {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017";

const clientObj = new MongoClient (url);
async function insertData(){
    try {
        const db = clientObj.db("vedant");
        const find = db.collection("find");
        const findData = {ename:"vermaVikas",eadd: '654,Kalka', Dob: new Date("1999-05-12"), Salary: 320000, updateTime: new Date(), City: 'Mani Majra'}
        const result = await find.insertOne(findData);
        console.log("Data Inserted"+result);
    }
    catch(err){
        console.log(err);
    }
    finally{
        clientObj.close();
    }
}
insertData()