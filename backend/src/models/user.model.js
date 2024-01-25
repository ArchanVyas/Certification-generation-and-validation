const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type:{
    type:Number,
    required:true
  },
  //   todoTasks: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Todo",
  //     },
  //   ],
});

module.exports = mongoose.model("User", userSchema);
