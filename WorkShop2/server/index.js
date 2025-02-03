const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://sandovalkiany:010924@cluster0.cu6kb.mongodb.net/Cluster0");

// Importar controladores
const { taskPatch, taskPost, taskGet, getTipoCambio } = require("./controllers/taskController.js");

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: "*"
}));

// Rutas para tareas
app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks", taskPatch);
app.put("/api/tasks", taskPatch);

// Ruta para obtener el tipo de cambio
app.get("/tipodecambio", getTipoCambio);

// Iniciar servidor
app.listen(3000, () => console.log(`Servidor corriendo en http://localhost:3000`));

