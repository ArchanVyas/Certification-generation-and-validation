const User = require("../models/user.model");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants/");
const { jwtConfig } = require("../configs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    let { user } = req.params;
    let { password } = req.body;
    let { university } = req.body;
    let { qualifications } = req.body;
    let { skills } = req.body;

    let encryptPassword = await bcrypt.hash(password, 10);
    let userType = 2;
    if (user === "admin") {
      userType = 1;
    }
    const data = {
      ...req.body,
      password: encryptPassword,
      user_type: userType,
      university:university,
      qualifications:qualifications,
      skills:skills,
    };
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return failure(
        res,
        httpsStatusCodes.BAD_REQUEST,
        serverResponseMessage.EMAIL_ALREADY_EXISTS
      );
    }
    const response = await User.create(data);
    return success(
      res,
      httpsStatusCodes.CREATED,
      serverResponseMessage.USER_CREATED_SUCCESSFULLY,
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

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email , user_type:1 });
    if (!user) {
      return failure(
        res,
        httpsStatusCodes.UNAUTHORIZED,
        serverResponseMessage.INVALID_CREDENTIALS
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return failure(
        res,
        httpsStatusCodes.UNAUTHORIZED,
        serverResponseMessage.INVALID_CREDENTIALS
      );
    }
    const token = jwt.sign(
      { email: user.email, id: user._id, user_type: user.user_type },
      jwtConfig.jwtSecret,
      {
        expiresIn: jwtConfig.tokenExpiration,
      }
    );
    const data = {
      id: user._id,
      email: user.email,
      // user_type:user.user_type,
      token,
    };
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.LOGIN_SUCCESSFULL,
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

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email , user_type:2 });
    if (!user) {
      return failure(
        res,
        httpsStatusCodes.UNAUTHORIZED,
        serverResponseMessage.INVALID_CREDENTIALS
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return failure(
        res,
        httpsStatusCodes.UNAUTHORIZED,
        serverResponseMessage.INVALID_CREDENTIALS
      );
    }
    const token = jwt.sign(
      { email: user.email, id: user._id, user_type: user.user_type },
      jwtConfig.jwtSecret,
      {
        expiresIn: jwtConfig.tokenExpiration,
      }
    );
    const data = {
      id: user._id,
      email: user.email,
      // user_type:user.user_type,
      username:user.user_name,
      token,
    };
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.LOGIN_SUCCESSFULL,
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

exports.getProfile=async(req,res)=>{
  try {
  const {user} =req
  console.log(user)
   const response = await User.findOne({_id:user.id})
   return success(
     res,
     httpsStatusCodes.SUCCESS,
     serverResponseMessage.PROFILE_FETCHED_SUUCESSFULLY,
     response
   )
  } catch (error) {
    console.log(error)
   return failure(
     res,
     httpsStatusCodes.INTERNAL_SERVER_ERROR,
     serverResponseMessage.INTERNAL_SERVER_ERROR
   );
  }
 }
 
 
 exports.updateProfile = async (req, res) => {
   try {
     const { user } = req;
     let { password } = req.body;
     let data = { ...req.body };
 
     if (password) {
       // Hash the provided password
       try {
         const hashedPassword = await bcrypt.hash(password, 10);
         data.password = hashedPassword; // Update data with hashed password
       } catch (hashError) {
         // Handle error if hashing fails
         console.error("Error hashing password:", hashError);
         return failure(
           res,
           httpsStatusCodes.INTERNAL_SERVER_ERROR,
           "Error hashing password"
         );
       }
     }
 
     // Use findOneAndUpdate to find the user by ID and update the fields
     const updatedUser = await User.findOneAndUpdate(
       { _id:user.id },
       { $set: data },
       { new: true }
     );
 
     // Check if user was found and updated
     if (!updatedUser) {
       return failure(
         res,
         httpsStatusCodes.NOT_FOUND,
         serverResponseMessage.USER_NOT_FOUND
       );
     }
 
     // Respond with the updated user
     return success(
       res,
       httpsStatusCodes.SUCCESS,
       serverResponseMessage.PROFILE_UPDATED_SUCCESSFULLY,
       updatedUser
     );
   } catch (error) {
     console.error("Error updating profile:", error);
     return failure(
       res,
       httpsStatusCodes.INTERNAL_SERVER_ERROR,
       serverResponseMessage.INTERNAL_SERVER_ERROR
     );
   }
 };