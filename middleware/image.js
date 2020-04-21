const MIME_TYPE_MAP = require("../validation/mime").MIME_TYPE_IMAGE;
multer = require("multer");
const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require("../helpers/error_helper");

const storage = multer.diskStorage({
  // filename(req, file, callback) {
  //   callback(null, Date.now() + file.originalname);
  // }
  filename: (req, file, cb) => {
    let name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    if (name.split(".").length > 1) {
      let tempName = name.split(".");
      tempName.pop();
      name = tempName.join(".");
    }
    name += "-" + Date.now();
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "." + exports);
  }
});

// const storage = multer.diskStorage({
//   //Specify destination and validations

//   //Store the file
//   filename: (req, file, cb) => {
//     let name = file.originalname
//       .toLowerCase()
//       .split(" ")
//       .join("-");
//     if (name.split(".").length > 1) {
//       let tempName = name.split(".");
//       tempName.pop();
//       name = tempName.join(".");
//     }
//     name += "-" + Date.now();
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + "." + ext);
//   }
// });

const imageFilter = (req, file, cb) => {
  console.log("req.file", req.file);
  let error = new Error("Only Image files are allowed");
  // error = new FileError().__400__(ErrorMapping.INVALID_FILE);
  error.status = CONFLICT;
  // accept image files only
  //  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
  //    return cb(new Error("Only image files are allowed!"), false);
  //  }
  //  cb(null, true);
  const isValid = MIME_TYPE_MAP[file.mimetype];
  //validating our mime types
  if (file) {
    if (!isValid) {
      return cb(error, false);
    }
  }
  cb(null, true);
};

module.exports = (req, res, next) => {
  console.log("image.jsreq.file: ", req.file);

  multer({ storage: storage }).single("image")(req, res, err => {
    // catching and handling errors of multer
    if (err instanceof multer.MulterError) {
    } else if (err) {
      console.log("multer error", err);

      throw err;
    }
    next();
  });
};

//const upload = multer({ storage, fileFilter: imageFilter });
