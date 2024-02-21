const Certificate = require("../models/certificate.model");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants/");

exports.createCertificate = async (req, res) => {
  try {
    const { user } = req;
    if (user.user_type === 1) {
      return failure(
        res,
        httpsStatusCodes.ACCESS_DENIED,
        serverResponseMessage.ACCESS_DENIED
      );
    }
    const data = {
      ...req.body,
      user_id:user._id,
      user_name:user.user_name,
      course_name:req.body.course,
      createdAt:new Date()
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


exports.updateCertificate = async (req, res) => {
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
    const data = {
      ...req.body,
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

