const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const session = require("express-session");
const { connectToDatabase, closeDatabase } = require("./database");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const imageStore = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageUploader = multer({
  storage: imageStore,
  limits: {
    fileSize: 2097152,
  },
  fileFilter(req, file, cb) {
    const fileTypes = /\.(jpg|png|gif|pdf)$/;
    if (!file.originalname.match(fileTypes)) {
      return cb(new Error("Only jpg, png, gif, and pdf files are allowed"));
    }
    cb(undefined, true);
  },
});

app.get("/", (req, res) => {
  res.render("fileupload_view");
});

app.get("/adduser", (req, res) => {
  const message = req.session.message || null;
  req.session.message = null;
  res.render("adduser_view", { error: null, user: {}, message });
});

app.post(
  "/adduserSubmit",
  imageUploader.single("profilePic"),
  async (req, res) => {
    const { name, email, password, gender, dob } = req.body;
    try {
      if (!req.file) {
        throw new Error("Profile picture is required");
      }

      const profilePic = req.file.filename;
      const db = await connectToDatabase();
      const empCollection = db.collection("emp");

      const empData = {
        ename: name,
        email: email,
        password: password, // Storing plain password (not recommended)
        gender,
        dob: new Date(dob),
        profilePic,
        updateTime: new Date(),
      };

      await empCollection.insertOne(empData);
      req.session.message = "User added successfully!";
      res.redirect("/adduser");
    } catch (error) {
      res.status(400).render("adduser_view", {
        error: error.message,
        user: { name, email, password, gender, dob },
        message: null,
      });
    } finally {
      await closeDatabase();
    }
  }
);

app.get("/listuser", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const userCollection = db.collection("emp");
    const users = await userCollection.find().toArray();
    res.render("listuser_view", { userdata: users });
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occurred while fetching user data.");
  }
});

// Edit User Route
app.get("/edituser/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const db = await connectToDatabase();
    const user = await db.collection("emp").findOne({ _id: new require("mongodb").ObjectId(userId) }); // Use 'new' here
    res.render("edituser_view", { user });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error fetching user.");
  }
});

// Update User Route
app.post("/edituser/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, gender, dob } = req.body;

  try {
    const db = await connectToDatabase();
    await db.collection("emp").updateOne(
      { _id: new require("mongodb").ObjectId(userId) }, // Use 'new' here
      {
        $set: {
          ename: name,
          email,
          password, // Updating to the new plain password
          gender,
          dob: new Date(dob),
          updateTime: new Date(),
        },
      }
    );

    res.redirect("/listuser");
  } catch (e) {
    console.log(e);
    res.status(500).send("Error updating user.");
  }
});

// Delete User Route
app.get("/deleteuser/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const db = await connectToDatabase();
    await db.collection("emp").deleteOne({ _id: new require("mongodb").ObjectId(userId) }); // Use 'new' here
    res.redirect("/listuser");
  } catch (e) {
    console.log(e);
    res.status(500).send("Error deleting user.");
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
