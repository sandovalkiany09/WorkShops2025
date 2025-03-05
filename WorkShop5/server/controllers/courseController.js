const Course = require("../models/courseModel");

/**
 * Creates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = async (req, res) => {
  let course = new Course(req.body);
  await course.save()
    .then(course => {
      res.status(201); // CREATED
      res.header({
        'location': `/course/?id=${course.id}`
      });
      res.json(course);
    })
    .catch( err => {
      res.status(422);
      console.log('error while saving the course', err);
      res.json({
        error: 'There was an error saving the course'
      });
    });
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  // Si se solicita un curso específico mediante query string (req.query.id)
  if (req.query && req.query.id) {
    Course.findById(req.query.id)
      .populate('teacher', 'first_name last_name')  // Poblar el campo teacher con first_name y last_name
      .then(course => {
        res.json(course);
      })
      .catch(err => {
        res.status(404);
        console.log('Error al consultar el curso', err);
        res.json({ error: "Course doesn't exist" });
      });
  } else {
    // Si se solicitan todos los cursos
    Course.find()
      .populate('teacher', 'first_name last_name')  // Poblar el campo teacher
      .then(courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422);
        res.json({ error: err });
      });
  }
};


/**
 * Updates a courses
 *
 * @param {*} req
 * @param {*} res
 */
const coursePatch = (req, res) => {
  // get course by id
  if (req.query && req.query.id) {
    Course.findById(req.query.id, function (err, course) {
      if (err) {
        res.status(404);
        console.log('error while querying the course', err)
        res.json({ error: "Course doesn't exist" })
      }

      // Actualiza todos los campos disponibles en el cuerpo de la solicitud
      course.name = req.body.name || course.name;
      course.code = req.body.code || course.code;
      course.description = req.body.description || course.description;
      course.teacher = req.body.teacher || course.teacher;

      course.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the course', err)
          res.json({
            error: 'There was an error saving the course'
          });
        }
        res.status(200); // OK
        res.json(course); // Responder con los datos del curso actualizado
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Course doesn't exist" });
  }
};

/**
 * Deletes a course
 *
 * @param {*} req
 * @param {*} res
 */
 const courseDelete = (req, res) => {
  // get course by id
  if (req.query && req.query.id) {
    Course.findById(req.query.id, function (err, course) {
      if (err) {
        res.status(404);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      }

      course.deleteOne(function (err) {
        if (err) {
          res.status(422);
          console.log('error while deleting the course', err)
          res.json({
            error: 'There was an error deleting the course'
          });
        }
        res.status(204); //No content
        res.json({});
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Course doesnt exist" })
  }
};

module.exports = {
  coursePost,
  courseGet,
  coursePatch,
  courseDelete
}