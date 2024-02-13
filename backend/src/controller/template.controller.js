const Template = require('../models/template.model')
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants/");

exports.createTemplate = async(req,res)=>{
    try {
        const { user } = req;
        if (user.user_type === 2) {
          return failure(
            res,
            httpsStatusCodes.ACCESS_DENIED,
            serverResponseMessage.ACCESS_DENIED
          );
        }
        const data = {
          ...req.body,
        };
        const response = await Template.create(data);
        return success(
          res,
          httpsStatusCodes.CREATED,
          serverResponseMessage.TEMPLATE_CREATED_SUCCESSFULLY,
          response
        );
      } catch (error) {
        return failure(
          res,
          httpsStatusCodes.INTERNAL_SERVER_ERROR,
          serverResponseMessage.INTERNAL_SERVER_ERROR
        );
      }
}

exports.updateTemplate = async(req,res)=>{
    try {
        const { user } = req;
        if (user.user_type === 2) {
          return failure(
            res,
            httpsStatusCodes.ACCESS_DENIED,
            serverResponseMessage.ACCESS_DENIED
          );
        }
        const template = await Template.findById(req.params.id);
        if(!template){
            return failure(
                res,
                httpsStatusCodes.NOT_FOUND,
                serverResponseMessage.TEMPLATE_NOT_FOUND
              );
        }
        const data = {
            ...req.body,
          };
          const response = await Template.findByIdAndUpdate(req.params.id, data, {
            new: true,
          });
          return success(
            res,
            httpsStatusCodes.SUCCESS,
            serverResponseMessage.STATUS_CHANGED_SUCCESSFULLY,
            response
          );
    } catch (error) {
        return failure(
            res,
            httpsStatusCodes.INTERNAL_SERVER_ERROR,
            serverResponseMessage.INTERNAL_SERVER_ERROR
          );
    }
}

exports.getTemplate = async(req,res)=>{
    try {
        const response = await Template.find();
        return success(
          res,
          httpsStatusCodes.SUCCESS,
          serverResponseMessage.TEMPLATE_FETCHED_SUCCESSFULLY,
          response
        );
      } catch (error) {
        return failure(
          res,
          httpsStatusCodes.INTERNAL_SERVER_ERROR,
          serverResponseMessage.INTERNAL_SERVER_ERROR
        );
      }
}