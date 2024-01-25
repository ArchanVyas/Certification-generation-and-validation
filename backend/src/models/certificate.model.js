const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const certificateSchema = new Schema({
  certificate_name: {
    type: String,
    required: true,
  },
  certificate_description: {
    type: String,
    required: true,
  },
  certificate_path: {
    type: String,
    required: true,
  },
  // created_by: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
});

module.exports = mongoose.model("Certificate", certificateSchema);
