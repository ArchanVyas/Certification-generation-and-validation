const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants/");
const { jwtConfig } = require("../configs");
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return failure(
        res,
        httpsStatusCodes.UNAUTHORIZED,
        serverResponseMessage.TOKEN_MISSING
      );
    }

    const jwtToken = token.split(" ")[1];

    try {
      const decodedToken = jwt.verify(jwtToken, jwtConfig.jwtSecret);
      // Extract the user ID from the decoded token payload
      const userId = decodedToken.id;

      // Find the user based on the extracted user ID
      const userDetails = await User.findOne({ _id:userId });

      // Check if the user exists
      if (!userDetails) {
        return failure(
          res,
          httpsStatusCodes.UNAUTHORIZED,
          serverResponseMessage.INVALID_TOKEN
        );
      }

      // Attach the user details to the request object
      req.user = userDetails;

      // Call the next middleware
      next();
    } catch (err) {
      // Handle different JWT verification errors
      if (err.name === 'TokenExpiredError') {
        return failure(
          res,
          httpsStatusCodes.UNAUTHORIZED,
          serverResponseMessage.TOKEN_EXPIRED
        );
      } else {
        return failure(
          res,
          httpsStatusCodes.UNAUTHORIZED,
          serverResponseMessage.INVALID_TOKEN
        );
      }
    }
  } catch (error) {
    // Handle other errors
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.SERVER_ERROR
    );
  }
};



module.exports = isAuthenticated;
