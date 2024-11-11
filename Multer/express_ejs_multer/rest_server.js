var express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
app.use(cors("http://localhost:3002")); // Updated to match client origin
app.use(express.json());


app.get("/", function(req, res) {
  let d = new Date();
  res.status(200).send({ msg: "Welcome to the REST-API Server at " + d.getHours() + " : " + d.getMinutes() + " : " + d.getSeconds() });
});

app.get("/checkdata", function(req,res) {
    let id = parseInt(req.query['id']);
    if(id===123) {
        res.status(200).send({msg:"You are welcome customer"});
    }
    else {
        res.status(200).send({msg:"Wrong ID given"});
    }
});

app.post("/signupsubmit",function(req,res){
  const {name,email,pass,dob,gender} = req.body;
  console.log(name);
  console.log(email);
  console.log(gender);
  res.status(200).send({msg:"Request Received"});
});

app.listen(3001, () => {
  console.log("REST-API server running at http://localhost:3001");
});