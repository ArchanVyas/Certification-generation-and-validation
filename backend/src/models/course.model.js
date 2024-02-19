const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    template_Id: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ['0', '1','2'],
      default:"0"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User" // reference to the User model
    },
  });

module.exports = mongoose.model("Courses", courseSchema);
