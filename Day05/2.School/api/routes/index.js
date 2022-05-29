const router = require("express").Router();
const studentsController = require("./../controllers/students.controller")
const coursesController = require("./../controllers/courses.controller");

router.route("/students")
    .get(studentsController.getAll);

router.route("/students/:studentId")
    .get(studentsController.getOne);

router.route("/students/:studentId/courses")
    .get(coursesController.getAll);

router.route("/students/:studentId/courses/:courseId")
    .get(coursesController.getOne);

module.exports = router;