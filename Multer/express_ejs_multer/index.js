const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');
const { ObjectId } = require('mongodb');

// Import the database functions
const { connectToDatabase, closeDatabase } = require('./database');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Use express-session middleware
app.use(session({
    secret: 'your_secret_key', // Change this to a random secure string
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

const imageStore = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const imageUploader = multer({
    storage: imageStore,
    limits: {
        fileSize: 2097152 
    },
    fileFilter(req, file, cb) {
        const fileTypes = /\.(jpg|png|gif|pdf|jpeg)$/;
        if (!file.originalname.match(fileTypes)) {
            return cb(new Error("Only jpg, png, gif, and pdf files are allowed"));
        }
        cb(undefined, true);
    }
});

app.set('view engine', 'ejs');

// Routes
app.get("/", (req, res) => {
    res.render("fileupload_view");
});

// Route to render Add User form
app.get("/adduser", (req, res) => {
    const message = req.session.message || null;
    req.session.message = null;  // Clear message after displaying
    res.render("adduser_view", { error: null, user: {}, message });
});

// Route to handle form submission
app.post("/adduserSubmit", imageUploader.single("profilePic"), async (req, res) => {
    const { name, email, password, gender, dob } = req.body;

    try {
        if (!req.file) {
            throw new Error("Profile picture is required");
        }

        const profilePic = req.file.filename;

        // MongoDB operations
        const db = await connectToDatabase();
        const empCollection = db.collection("emp");

        const empData = {
            ename: name,
            email: email,
            password: password,
            gender: gender,
            dob: new Date(dob),
            profilePic: profilePic,
            updateTime: new Date(),
            softdelete: 0,
        };

        const result = await empCollection.insertOne(empData);
        console.log("Data inserted: " + result.insertedId);

        // Set success message in session
        req.session.message = "User added successfully!";
        res.redirect("/adduser");  // Redirect back to the form page
    } catch (error) {
        res.status(400).render("adduser_view", {
            error: error.message,
            user: { name, email, password, gender, dob },
            message: null  // Clear message
        });
    } finally {
        await closeDatabase();
    }
});

// List users
app.get("/listuser", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const empCollection = db.collection("emp");
        const users = await empCollection.find().toArray();
        
        const message = req.session.message || null;
        req.session.message = null; // Clear message after displaying

        res.render("listuser_view", { users, message });
    } catch (error) {
        res.status(500).send("Error retrieving users");
    } finally {
        await closeDatabase();  // Close only if required
    }
});

// Render edit user form
app.get("/edituser", async (req, res) => {
    const userId = req.query.id;
    try {
        const db = await connectToDatabase();
        const empCollection = db.collection("emp");
        const user = await empCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.render("edituser_view", { user, message: null, error: null }); // Pass error as null
    } catch (error) {
        res.status(500).send("Error retrieving user");
    } finally {
        await closeDatabase();  // Close only if required
    }
});


// Handle edit form submission
app.post("/edituserSubmit", imageUploader.single("profilePic"), async (req, res) => {
    const userId = req.query.id;
    const { name, email, password, gender, dob } = req.body;

    try {
        const db = await connectToDatabase();
        const empCollection = db.collection("emp");

        const updateFields = {
            ename: name,
            email: email,
            password: password,
            gender: gender,
            dob: new Date(dob),
            updateTime: new Date()
        };

        if (req.file) {
            updateFields.profilePic = req.file.filename;
        }

        const result = await empCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            throw new Error("User not found");
        }

        req.session.message = "User updated successfully!";
        res.redirect("/listuser");
    } catch (error) {
        res.status(400).send("Error updating user: " + error.message);
    } finally {
        await closeDatabase();  // Close only if required
    }
});

// Delete user
// Delete user (soft delete)
app.get("/deleteuser", async (req, res) => {
    const userId = req.query.id;
    try {
        const db = await connectToDatabase();
        const empCollection = db.collection("emp");

        const result = await empCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { softdelete: 1 } } 
        );

        if (result.matchedCount === 0) {
            throw new Error("User not found");
        }

        req.session.message = "User deleted successfully!";
        res.redirect("/listuser");
    } catch (error) {
        res.status(500).send("Error deleting user");
    } finally {
        await closeDatabase();  
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});