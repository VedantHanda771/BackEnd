let {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017";

const clientObj = new MongoClient (url);
async function selecctData(){
    try {
        const db = clientObj.db("vedant");
        const find = db.collection("find");
        // const data = await find.findOne();
        const emplist = await find.find();
        for await (const find of emplist){
        console.log(find);
        }
    }
    catch(err) {
        console.log(err);
    }
    finally{
        await clientObj.close();
    }
}

selecctData();