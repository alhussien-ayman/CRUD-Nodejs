const Course = require("../models/course.model");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require('../utils/appError')
const getAllCourses =asyncWrapper ( async (req, res) => {
  const query = req.query;
  console.log("query", query);
  const limit = query.limit || 10;
  const page = query.page || 1;
  ["p1", "p2", "p3"];
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
});

const getCourse = asyncWrapper(async (req, res,next) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
   
    const error = appError.create ("NOT FOUND COURSE" , 404 , httpStatusText.FAIL)
    return next(error) 
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { course } });
  }
);

const addCourse = asyncWrapper(async (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error =appError.create(errors.array(), 400,httpStatusText.FAIL)
    return next(error)
  }
  console.log(errors);
  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { courses: newCourse } });
});

const updateCourse =asyncWrapper ( async (req, res) => {
  
    const courseUpdate = await Course.updateOne(
      { _id: req.params.courseId },
      { $set: { ...req.body } }
    );
    res
      .status(200)
      .json({
        status: httpStatusText.SUCCESS,
        data: { courses: courseUpdate },
      });
  
});

const deleteCourse =asyncWrapper ( async (req, res) => {
  await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
