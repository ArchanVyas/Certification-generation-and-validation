const express = require("express");
const router = express.Router();
const { uploadImgStorage } = require("../utils/file-upload.utils");
const {
  createCertificate,
  getAllCertificates,
  updateCertificate,
} = require("../controller/certificate.controller");
const isAuthenticated = require("../middleware/authentication.middelware");

module.exports = () => {
  router.post(
    "/createCertificate",
    isAuthenticated,
    uploadImgStorage,
    createCertificate
  );
  router.get(
    "/getCertificate",
    isAuthenticated,
    uploadImgStorage,
    getAllCertificates
  );
  router.patch(
    "/updateCertificate/:id",
    isAuthenticated,
    uploadImgStorage,
    updateCertificate
  );
  return router;
};
