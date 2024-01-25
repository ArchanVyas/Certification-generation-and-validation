const express = require("express");
const router = express.Router();
const { signUp , login } = require("../controller/user.controller");
const isAuthenticated = require('../middleware/authentication.middelware')

module.exports = () => {
  router.post("/signUp/:user", signUp);
  router.post("/login",login)
  return router;
};
