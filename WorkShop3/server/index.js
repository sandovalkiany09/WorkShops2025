const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://sandovalkiany:010924@cluster0.cu6kb.mongodb.net/workshop4")

const {
  teacherGet,
  teacherPost,
  teacherPatch,
  teacherDelete
} = require("./controllers/teacherController");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

//Teacher
app.get("/teachers", teacherGet);
app.post("/teachers", teacherPost);
app.patch("/teachers", teacherPatch); 
app.put("/teachers", teacherPatch);    
app.delete("/teachers", teacherDelete);

//Course
// app.get("/api/courses", courseGet);
// app.post("/api/courses", coursePost);

app.listen(3000, () => console.log(`Example app listening on port 3000!`))
