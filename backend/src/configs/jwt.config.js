"use strict";
require("dotenv").config()

const jwtConfig = {
  /*
  |--------------------------------------------------------------------------
  | JWT
  |--------------------------------------------------------------------------
  */
  jwtSecret: process.env.JWT_SECRET,
  tokenExpiration: "1h",
};
module.exports = jwtConfig;
