const express = require("express");
const router = express.Router();
const { uploadImgStorage } = require("../utils/file-upload.utils");
const {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
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
  router.get(
    "/getCertificate/:id",
    isAuthenticated,
    uploadImgStorage,
    getCertificateById
  );
  router.patch(
    "/updateCertificate/:id",
    isAuthenticated,
    uploadImgStorage,
    updateCertificate
  );
  router.delete(
    "/deleteCertificate/:id",
    isAuthenticated,
    uploadImgStorage,
    deleteCertificate
  );
  //   router.post("/login",login)
  return router;
};
