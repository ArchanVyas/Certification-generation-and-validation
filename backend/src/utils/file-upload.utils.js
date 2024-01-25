const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants");
const {
  mediaConfig: {
    imageUpload: { ImagePath },
    main_upload_dir,
  },
} = require("../configs");
const {
  globalConstants: { allowedMultipleFiles },
} = require("../constants");

const uploadImg = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsPath = main_upload_dir + "/" + ImagePath;
    if (!fs.existsSync(path.join(__dirname, `/../..${uploadsPath}`))) {
      fs.mkdirSync(path.join(__dirname, `/../..${uploadsPath}`), {
        recursive: true,
      });
    }

    cb(null, path.join(__dirname, `/../..${uploadsPath}`));
  },
  filename: (req, file, cb) => {
    const uploadsPath = main_upload_dir + "/" + ImagePath;

    const fileLocation = path.join(__dirname, `/../..${uploadsPath}`);
    req.media_details = {
      name: Date.now() + "_" + file.originalname.replaceAll(" ", "_"),
      mime_type: file.mimetype,
      extensions: file.mimetype.split("/")[1],
      original_name: file.originalname,
      file_location: fileLocation,
      file_path: uploadsPath.replace("/public", ""),
    };
    cb(null, Date.now() + "_" + file.originalname.replaceAll(" ", "_"));
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedMultipleFiles.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file format, allowed formats are jpg,png,jpeg."),
      false
    );
  }
};

const uploadImgStorage = multer({ storage: uploadImg }).single(
  "upload_file"
);

module.exports = {
  uploadImgStorage: (req, res, next) => {
    // Custom middleware to handle fileFilter error
    uploadImgStorage(req, res, (err) => {
      if (
        err instanceof Error &&
        err.message === "Invalid file format, allowed formats are jpg,png,jpeg."
      ) {
        // Handle fileFilter error
        return failure(
          res,
          httpsStatusCodes.BAD_REQUEST,
          "INVALID_FILE_FORMAT"
        );
      } else if (err) {
        return failure(
          res,
          httpsStatusCodes.INTERNAL_SERVER_ERROR,
          serverResponseMessage.INTERNAL_SERVER_ERROR
        );
      } else {
        return next();
      }
    });
  },
};
