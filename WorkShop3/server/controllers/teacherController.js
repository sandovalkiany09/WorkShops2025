const Teacher = require("../models/teacherModel");

/**
 * Crea un Profesor
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPost = (req, res) => {
  var teacher = new Teacher();

  teacher.name = req.body.name;
  teacher.subject = req.body.subject;

  if (teacher.name && teacher.subject) {
    teacher.save(function (err) {
      if (err) {
        res.status(422);
        console.log('Error al guardar el profesor', err);
        res.json({
          error: 'Hubo un error al guardar el profesor'
        });
      }
      res.status(201); //CREADO
      res.header({
        'location': `http://localhost:3000/api/teachers/?id=${teacher.id}`
      });
      res.json(teacher);
    });
  } else {
    res.status(422);
    console.log('Error al guardar el profesor');
    res.json({
      error: 'No se proporcionaron datos válidos para el profesor'
    });
  }
};

/**
 * Obtiene todos los profesores o uno específico
 *
 * @param {*} req
 * @param {*} res
 */
const teacherGet = (req, res) => {
  // Si se requiere un profesor específico
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log('Error al consultar el profesor', err);
        res.json({ error: "El profesor no existe" });
      }
      res.json(teacher);
    });
  } else {
    // Obtener todos los profesores
    Teacher.find(function (err, teachers) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(teachers);
    });
  }
};

/**
 * Elimina un profesor
 *
 * @param {*} req
 * @param {*} res
 */
const teacherDelete = (req, res) => {
  // Si se requiere un profesor específico
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(500);
        console.log('Error al consultar el profesor', err);
        res.json({ error: "El profesor no existe" });
      }
      // Si el profesor existe
      if (teacher) {
        teacher.remove(function (err) {
          if (err) {
            res.status(500).json({ message: "Hubo un error al eliminar el profesor" });
          }
          res.status(204).json({});
        });
      } else {
        res.status(404);
        console.log('Error al consultar el profesor', err);
        res.json({ error: "El profesor no existe" });
      }
    });
  } else {
    res.status(404).json({ error: "Debes proporcionar el ID del profesor" });
  }
};

/**
 * Actualiza un profesor
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPatch = (req, res) => {
  // Obtener el profesor por su id
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log('Error al consultar el profesor', err);
        res.json({ error: "El profesor no existe" });
      }

      // Actualizar el objeto profesor (patch)
      teacher.name = req.body.name ? req.body.name : teacher.name;
      teacher.subject = req.body.subject ? req.body.subject : teacher.subject;

      teacher.save(function (err) {
        if (err) {
          res.status(422);
          console.log('Error al guardar el profesor', err);
          res.json({
            error: 'Hubo un error al guardar el profesor'
          });
        }
        res.status(200); // OK
        res.json(teacher);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "El profesor no existe" });
  }
};

module.exports = {
  teacherGet,
  teacherPost,
  teacherPatch,
  teacherDelete
};
