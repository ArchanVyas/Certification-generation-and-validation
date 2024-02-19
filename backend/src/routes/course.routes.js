const express = require("express");
const router = express.Router();
// const {createTemplate,updateTemplate,getTemplate} = require("../controller/template.controller")
const {createCourse,getCourses,updateCourse} = require("../controller/course.controller")
const isAuthenticated = require('../middleware/authentication.middelware')

module.exports = () => {
  router.get('/getCourse',isAuthenticated,getCourses)
  router.post("/createCourse",isAuthenticated, createCourse);
  router.post("/updateCourse",isAuthenticated,updateCourse);
  return router;
};
