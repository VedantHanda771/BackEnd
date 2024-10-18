var express = require('express');
const app = express();
let bodyParser = require('body-parser');
let expressSession = require('express-session');
let db = require('./database.js');

app.use(expressSession({
    secret: "node mongo1231@#",
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    let msg = "";
    if (req.session.msg != undefined && req.session.msg != "") {
        msg = req.session.msg;
    }
    res.render('home', { msg: msg });
});

app.get('/listcategory', async function(req, res) {
    try {
        const category = db.collection("categery");
        const catList = await category.find().toArray();
        res.render("categery_list_view", { catList: catList });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching categories");
    }
});

app.get('/addcategory', function(req, res) {
    res.render('addcategery_view');
});

app.post('/addCategorySubmit', async function(req, res) {
    try {
        const category = db.collection("categery");
        const result = await category.insertOne({ catname: req.body.catname });
        if (result.acknowledged == true) {
            req.session.msg = "Category Added Successfully";
            res.redirect('/');
        } else {
            req.session.msg = "Category not added";
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        req.session.msg = "Error occurred while adding category";
        res.redirect('/');
    }
});

app.get("deletecategery", async function(req, res){
	let catid = req.query["catid"];
	const category = db.collection("categery");
	const result = await category.deleteOne({_id:new ObjectId(catid)});
	if(result.deletedCount > 0){
		req.session.msg = "Category deleted successfully";
	}
	else{
		req.session.msg = "Category not deleted";
	}
	res.redirect('/');
});

app.get('/additem',function(req,res){
	res.render("additem_view");
});
app.post("/addItemSubmit",async function(req, res){
	const itemObj= db.collection('item');
	const colorArray= req.body.color.split(",");
	let doe="";
	if(req.body.doe!="")
		doe= new Date(req.body.doe);
	const result= await itemObj.insertOne({iname:req.body.iname, price:req.body.price, dom:new Date(req.body.dom), doe:doe});
	if(result.acknowledged===true)
		req.session.msg="Item added";
	else 
		req.session.msg="can not add item try again";
	res.redirect("/");
});


app.listen(8080, () => console.log("CRUD Server running at port no. 8080"));