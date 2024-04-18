const express = require("express");
const router = express.Router();
// const {createTemplate,updateTemplate,getTemplate} = require("../controller/template.controller")
const {createCourse,getCourses,updateCourse , getCourseDetailsInNumber,getCourseDetailsInPercentage , searchCertificate , validateCourse} = require("../controller/course.controller")
const isAuthenticated = require('../middleware/authentication.middelware')

module.exports = () => {
  router.get('/getCourse',isAuthenticated,getCourses)
  router.get('/validateCourse',validateCourse)
  router.post('/searchCertificate', searchCertificate)
  router.get('/getCourseDetails/number', isAuthenticated, getCourseDetailsInNumber)
  router.get('/getCourseDetails/percentage', isAuthenticated , getCourseDetailsInPercentage)
  router.post("/createCourse",isAuthenticated, createCourse);
  router.post("/updateCourse",isAuthenticated,updateCourse);
  return router;
};
