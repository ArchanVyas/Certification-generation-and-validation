const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    template_Id: {
      type: Number,
      // required: true,
    },
    status: {
      type: Boolean,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User" // reference to the User model
    },
    user_name:{
      type:String
    },
    course_name:{
      type:String
    },
    certificate:{
      type:String,
      default:""
    },
    uniqueId:{
      type:String,
      default:""
    }
  });

module.exports = mongoose.model("Courses", courseSchema);
