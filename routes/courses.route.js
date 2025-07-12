const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courses.controller");
const { body } = require("express-validator");
const {validationSchema} =require ('../middleware/validationSchema')
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(validationSchema(),
    coursesController.addCourse
  );
router
  .route("/:courseId").get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
