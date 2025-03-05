const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://sandovalkiany:010924@cluster0.cu6kb.mongodb.net/workshop4")

const {
  base64decode
} = require('nodejs-base64');

const {
  teacherGet,
  teacherPost,
  teacherPatch,
  teacherDelete
} = require("./controllers/teacherController");

const {
  courseGet,
  coursePost,
  coursePatch,
  courseDelete
} = require("./controllers/courseController");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

// Auth basic http
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    //Basic VVROOlBhc3N3b3JkMQ==
    const authBase64 = req.headers['authorization'].split(' ');
    const userPass = base64decode(authBase64[1]);
    const user = userPass.split(':')[0];
    const password = userPass.split(':')[1];

    if (user === 'admin' && password == '1234') {
      // saveSession('admin');
      next();
      return;
    }
  }
  res.status(401);
  res.send({
    error: "Unauthorized"
  });
});

//Teacher
app.get("/teachers", teacherGet);
app.post("/teachers", teacherPost);
app.patch("/teachers", teacherPatch); 
app.put("/teachers", teacherPatch);    
app.delete("/teachers", teacherDelete);

//Course
app.get("/course", courseGet);
app.post("/course", coursePost);
app.patch("/course", coursePatch); 
app.delete("/course", courseDelete);

app.listen(3000, () => console.log(`Example app listening on port 3000!`))
