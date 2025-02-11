const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://sandovalkiany:010924@cluster0.cu6kb.mongodb.net/workshop3");

const {
  taskPatch,
  taskPost,
  taskGet,
  taskDelete
} = require("./controllers/taskController.js");

const {
  studentPatch,
  studentPost,
  studentGet,
  studentDelete
} = require("./controllers/studentController.js");

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


// listen to the task request
app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks", taskPatch);
app.put("/api/tasks", taskPatch);
app.delete("/api/tasks", taskDelete);

app.get("/api/students", studentGet);
app.post("/api/students", studentPost);
app.patch("/api/students", studentPatch);
app.put("/api/students", studentPatch);
app.delete("/api/students", studentDelete);

app.get("/api/teachers", teacherGet);
app.post("/api/teachers", teacherPost);
app.patch("/api/teachers", teacherPatch); 
app.put("/api/teachers", teacherPatch);    
app.delete("/api/teachers", teacherDelete);

app.listen(3000, () => console.log(`Example app listening on port 3000!`))
