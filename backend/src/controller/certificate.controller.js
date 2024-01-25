const path = require("path");
const fs = require("fs");
const Certificate = require("../models/certificate.model");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants/");
const {
  mediaConfig,
  mediaConfig: {
    imageUpload: { ImagePath },
  },
} = require("../configs");
const dir = path.resolve(__dirname, "../../");
const removeCertificate = async (certificate) => {
  const existingCertificateFileName = certificate.certificate_path
    .split("/")
    .pop();
  const existingCertificatePath = path.join(
    dir,
    mediaConfig.main_upload_dir + "/" + ImagePath + existingCertificateFileName
  );
  await fs.promises.unlink(existingCertificatePath);
};

exports.createCertificate = async (req, res) => {
  try {
    const { user } = req;
    const certificatePath =
      req.media_details.file_path + req.media_details.name;
    if (user.user_type === 2) {
      return failure(
        res,
        httpsStatusCodes.ACCESS_DENIED,
        serverResponseMessage.ACCESS_DENIED
      );
    }
    const data = {
      ...req.body,
      certificate_path: certificatePath,
    };
    const response = await Certificate.create(data);
    return success(
      res,
      httpsStatusCodes.CREATED,
      serverResponseMessage.CERTIFICATE_CREATED_SUCCESSFULLY,
      response
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const response = await Certificate.find();
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.CERTIFICATE_FETCHED_SUCCESSFULLY,
      response
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return failure(
        res,
        httpsStatusCodes.NOT_FOUND,
        serverResponseMessage.CERTIFICATE_NOT_FOUND
      );
    }
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.CERTIFICATE_FETCHED_SUCCESSFULLY,
      certificate
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const { user } = req;
    const certificatePath =
      req.media_details.file_path + req.media_details.name;
    if (user.user_type === 2) {
      return failure(
        res,
        httpsStatusCodes.ACCESS_DENIED,
        serverResponseMessage.ACCESS_DENIED
      );
    }
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return failure(
        res,
        httpsStatusCodes.NOT_FOUND,
        serverResponseMessage.CERTIFICATE_NOT_FOUND
      );
    }
    await removeCertificate(certificate);
    const data = {
      ...req.body,
      certificate_path: certificatePath,
    };
    const response = await Certificate.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.CERTIFICATE_UPDATED_SUCCESSFULLY,
      response
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const { user } = req;
    if (user.user_type === 2) {
      return failure(
        res,
        httpsStatusCodes.ACCESS_DENIED,
        serverResponseMessage.ACCESS_DENIED
      );
    }
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return failure(
        res,
        httpsStatusCodes.NOT_FOUND,
        serverResponseMessage.CERTIFICATE_NOT_FOUND
      );
    }
    await removeCertificate(certificate);
    await Certificate.findByIdAndDelete(req.params.id);
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.CERTIFICATE_DELETED_SUCCESSFULLY
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};
