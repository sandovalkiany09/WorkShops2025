const Task = require("../models/taskModel");

/**
 * Creates a task
 *
 * @param {*} req
 * @param {*} res
 */
const taskPost = (req, res) => {
  var task = new Task();

  task.title = req.body.title;
  task.detail = req.body.detail;

  if (task.title && task.detail) {
    task.save(function (err) {
      if (err) {
        res.status(422);
        console.log('Error while saving the task', err);
        res.json({
          error: 'There was an error saving the task'
        });
      } else {
        res.status(201); // CREATED
        res.header({
          'location': `http://localhost:3000/api/tasks/?id=${task.id}`
        });
        res.json(task);
      }
    });
  } else {
    res.status(422);
    console.log('Error while saving the task');
    res.json({
      error: 'No valid data provided for task'
    });
  }
};

/**
 * Get all tasks or a specific task by ID
 *
 * @param {*} req
 * @param {*} res
 */
const taskGet = (req, res) => {
  if (req.query && req.query.id) {
    Task.findById(req.query.id, function (err, task) {
      if (err || !task) {
        res.status(404);
        console.log('Error while querying the task', err);
        res.json({ error: "Task doesn't exist" });
      } else {
        res.json(task);
      }
    });
  } else {
    Task.find(function (err, tasks) {
      if (err) {
        res.status(422);
        res.json({ error: err });
      } else {
        res.json(tasks);
      }
    });
  }
};

/**
 * Updates a task
 *
 * @param {*} req
 * @param {*} res
 */
const taskPatch = (req, res) => {
  if (req.query && req.query.id) {
    Task.findById(req.query.id, function (err, task) {
      if (err || !task) {
        res.status(404);
        console.log('Error while querying the task', err);
        res.json({ error: "Task doesn't exist" });
      } else {
        task.title = req.body.title ? req.body.title : task.title;
        task.detail = req.body.detail ? req.body.detail : task.detail;

        task.save(function (err) {
          if (err) {
            res.status(422);
            console.log('Error while saving the task', err);
            res.json({
              error: 'There was an error saving the task'
            });
          } else {
            res.status(200); // OK
            res.json(task);
          }
        });
      }
    });
  } else {
    res.status(404);
    res.json({ error: "Task doesn't exist" });
  }
};

/**
 * Get Tipo de Cambio
 *
 * @param {*} req
 * @param {*} res
 */
const getTipoCambio = (req, res) => {
  const type = req.query.type;

  // Simulación de datos de tipo de cambio
  const exchangeRates = {
    usd: { tipoCambioVenta: 550, tipoCambioCompra: 540 },
    eur: { tipoCambioVenta: 600, tipoCambioCompra: 590 }
  };

  if (exchangeRates[type]) {
    res.json(exchangeRates[type]);
  } else {
    res.status(400).json({ error: "Moneda no soportada" });
  }
};

module.exports = {
  taskGet,
  taskPost,
  taskPatch,
  getTipoCambio
};
