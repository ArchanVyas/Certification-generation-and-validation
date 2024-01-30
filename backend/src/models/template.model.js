const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  template_name: {
    type: String,
    required: false,
  },
  template_values: {
    type: String,
    required: false,
  },
  template_code: {
    type: Number,
    required: false,
  },
  is_verified: {
    type: Boolean,
    default: false 
  }
});

module.exports = mongoose.model("Template", templateSchema);
