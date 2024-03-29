const Courses = require("../models/course.model")
const Template = require("../models/template.model")
const User = require("../models/user.model");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants/");

exports.createCourse=async(req,res)=>{
    try {
    const { user } = req; 
    const {user_name,template_id,course} = req.body
    const userName = await User.findOne({_id:user.id})
      const template = await Template.findOne({ template_code: template_id });
      let certificate = template.template_values;
      certificate = certificate.toString().replace('John', user_name);
      certificate = certificate.toString().replace('courseName', course);
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    certificate = certificate.replace('Date', currentDate);
      const data = {
        userId:user.id,
        user_name:req.body.user_name,
        template_Id:req.body.template_id,
        course_name:req.body.course
      };
      if (userName.user_name.trim() === user_name.trim()) {
        data.status = true;
        data.certificate = certificate;
    } else {
        data.status = false;
        data.certificate="";
    }
      const response = await Courses.create(data);
      return success(
        res,
        httpsStatusCodes.CREATED,
        serverResponseMessage.COURSE_CREATED_SUCCESSFULLY,
        response
      );

    } catch (error) {
        console.log(error)
        return failure(
            res,
            httpsStatusCodes.INTERNAL_SERVER_ERROR,
            serverResponseMessage.INTERNAL_SERVER_ERROR
          );
    }
}

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
        const template = await Template.findOne({ template_code: course.template_Id });
        let certificate = template.template_values;
        certificate = certificate.toString().replace('Joe Nathan', course.user_name);
        certificate = certificate.toString().replace('joe nathan', course.user_name);
        let data = {
            ...req.body
        };

        // Set status based on user match
        if (user.user_name === course.user_name) {
            data.status = true;
            data.certificate = certificate;
        } else {
            data.status = false;
            data.certificate="";
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


