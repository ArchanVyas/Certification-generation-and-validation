const serverResponseMessage = {
    /* User */
    EMAIL_ALREADY_EXISTS: "Email already exists",
    USER_CREATED_SUCCESSFULLY: "User created successfully",
    INVALID_CREDENTIALS: "Invalid credentials",
    LOGIN_SUCCESSFULL: "Login successfull",

    /* Certificate */
    CERTIFICATE_CREATED_SUCCESSFULLY: "Certificate created successfully",
    CERTIFICATE_FETCHED_SUCCESSFULLY: "Certificate fetched successfully",
    CERTIFICATE_UPDATED_SUCCESSFULLY: "Certificate updated successfully",
    CERTIFICATE_DELETED_SUCCESSFULLY: "Certificate deleted successfully",
    CERTIFICATE_NOT_FOUND: "Certificate not found",
    ACCESS_DENIED: "Access denied",

    /* Template */
    TEMPLATE_CREATED_SUCCESSFULLY:"template created successfully",
    STATUS_CHANGED_SUCCESSFULLY:"template verified successfully",
    TEMPLATE_FETCHED_SUCCESSFULLY:"template fetched successfully",
    TEMPLATE_NOT_FOUND:"template not found",
    /* Catch Error */
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    TOKEN_EXPIRED: "Token expired",
    INVALID_TOKEN:"Invalid token",
  };
  
  module.exports = { serverResponseMessage };
  