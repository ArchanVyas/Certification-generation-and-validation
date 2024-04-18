const Courses = require("../models/course.model");
const Template = require("../models/template.model");
const User = require("../models/user.model");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants/");
const crypto = require('crypto');

function generateNumericId(length) {
  const numericChars = '0123456789';
  let numericId = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, numericChars.length);
      numericId += numericChars[randomIndex];
  }

  return numericId;
}

exports.createCourse = async (req, res) => {
  try {
    const { user } = req;
    const { user_name, template_id, course } = req.body;
    const randomNumericId = generateNumericId(8)
    const userName = await User.findOne({ _id: user.id });
    const template = await Template.findOne({ template_code: template_id });
    let certificate = template.template_values;
    certificate = certificate.toString().replace("John", user_name);
    certificate = certificate.toString().replace("courseName", course);
    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) + `<br></br> Unique ID: ${randomNumericId}`;
    certificate = certificate.replace("Date", currentDate);
    const data = {
      userId: user.id,
      user_name: req.body.user_name,
      template_Id: req.body.template_id,
      course_name: req.body.course,
      uniqueId:randomNumericId
    };
    if (userName.user_name.trim() === user_name.trim()) {
      data.status = true;
      data.certificate = certificate;
    } else {
      data.status = false;
      data.certificate = "";
    }
    const response = await Courses.create(data);
    return success(
      res,
      httpsStatusCodes.CREATED,
      serverResponseMessage.COURSE_CREATED_SUCCESSFULLY,
      response
    );
  } catch (error) {
    console.log(error);
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.getCourses = async (req, res) => {
  try {
    const { user } = req;
    let courses;

    if (user.user_type === 1) {
      courses = await Courses.find({});
    } else {
      courses = await Courses.find({ userId: user.id });
    }

    // Return the fetched courses
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.COURSES_FETCHED_SUCCESSFULLY,
      courses
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { user } = req;
    const { _id } = req.body;
    const course = await Courses.findOne({ _id });
    const template = await Template.findOne({
      template_code: course.template_Id,
    });
    let certificate = template.template_values;
    certificate = certificate
      .toString()
      .replace("Joe Nathan", course.user_name);
    certificate = certificate
      .toString()
      .replace("joe nathan", course.user_name);
    let data = {
      ...req.body,
    };

    // Set status based on user match
    if (user.user_name === course.user_name) {
      data.status = true;
      data.certificate = certificate;
    } else {
      data.status = false;
      data.certificate = "";
    }

    const updatedCourse = await Courses.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    if (!updatedCourse) {
      return failure(
        res,
        httpsStatusCodes.NOT_FOUND,
        serverResponseMessage.COURSE_NOT_FOUND
      );
    }

    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.COURSE_UPDATED_SUCCESSFULLY,
      updatedCourse
    );
  } catch (error) {
    console.log(error);
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.getCourseDetailsInNumber = async (req, res) => {
  try {
    const { user } = req;
    let totalCount, trueCount, falseCount;
    if (user.user_type === 1) {
      totalCount = await Courses.countDocuments();
      trueCount = await Courses.countDocuments({ status: true });
      falseCount = await Courses.countDocuments({ status: false });
    } else {
      totalCount = await Courses.countDocuments({ userId: user.id });
      trueCount = await Courses.countDocuments({
        status: true,
        userId: user.id,
      });
      falseCount = await Courses.countDocuments({
        status: false,
        userId: user.id,
      });
    }
    const data = {
      totalCount,
      acceptCount: trueCount,
      rejectCount: falseCount,
    };
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.COURSE_DETAILS_FETCHED_SUCCESSFULLY,
      data
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.getCourseDetailsInPercentage = async (req, res) => {
  try {
    const { user } = req;
    let totalCount, trueCount, falseCount;
    if (user.user_type === 1) {
      totalCount = await Courses.countDocuments();
      trueCount = await Courses.countDocuments({ status: true });
      falseCount = await Courses.countDocuments({ status: false });
    } else {
      totalCount = await Courses.countDocuments({ userId: user.id });
      trueCount = await Courses.countDocuments({
        status: true,
        userId: user.id,
      });
      falseCount = await Courses.countDocuments({
        status: false,
        userId: user.id,
      });
    }
    const truePercentage = Math.round((trueCount / totalCount) * 100);
    const falsePercentage = Math.round((falseCount / totalCount) * 100);
    const totalPercentage = truePercentage + falsePercentage;
    const data = {
      // totalCount: `${totalPercentage}%`,
      acceptCount: truePercentage,
      rejectCount: falsePercentage,
    };
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.COURSE_DETAILS_FETCHED_SUCCESSFULLY,
      data
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.validateCourse = async(req,res)=>{
  try {
    const courses = await Courses.find({status:true})
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.COURSES_FETCHED_SUCCESSFULLY,
      courses
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
}

exports.searchCertificate = async(req,res)=>{
  try {
    const {uniqueId} = req.body
    const courses = await Courses.find({uniqueId})
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.COURSES_FETCHED_SUCCESSFULLY,
      courses
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
}
