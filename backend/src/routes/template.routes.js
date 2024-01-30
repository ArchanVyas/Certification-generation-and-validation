const express = require("express");
const router = express.Router();
const {createTemplate,updateTemplate,getTemplate} = require("../controller/template.controller")
const isAuthenticated = require('../middleware/authentication.middelware')

module.exports = () => {
  router.get('/get-template',isAuthenticated,getTemplate)
  router.post("/create-template", isAuthenticated, createTemplate);
  router.patch("/update-template/:id",isAuthenticated, updateTemplate);
  return router;
};
