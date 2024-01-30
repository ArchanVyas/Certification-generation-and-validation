const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { logger } = require("./src/utils");
const mongoose = require("mongoose");
const router = express.Router();
const { databaseConfig } = require("./src/configs");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("App started...");
});

app.use(require("./src/routes")(router));

mongoose
  .connect(databaseConfig.url)
  .then((data) => {
    logger.info(`Server is running on port:${databaseConfig.port}`);
  })
  .catch((err) => {
    logger.error("error while connecting to database..", err);
  });
app.listen(databaseConfig.port);
