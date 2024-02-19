const express = require("express");
const router = express.Router();
const { signUp , adminLogin , userLogin , getProfile , updateProfile } = require("../controller/user.controller");
const isAuthenticated = require('../middleware/authentication.middelware')

module.exports = () => {
  router.post("/signUp/:user", signUp);
  router.post("/login/admin",adminLogin)
  router.post("/login/user",userLogin)
  router.get("/get-profile",isAuthenticated,getProfile)
  router.post("/update-profile",isAuthenticated,updateProfile)
  return router;
};
