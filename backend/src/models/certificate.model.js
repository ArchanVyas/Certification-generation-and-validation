const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    template_values: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ['0', '1'],
      default:"1"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User" // reference to the User model
      },
      user_name: {
        type: String // assuming user_name is a string
      },
    createdAt: {
      type: Date
    }
  });

module.exports = mongoose.model("Certificate", certificateSchema);
