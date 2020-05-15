const MIME_TYPE_MAP = require("../validation/mime").MIME_TYPE_IMAGE;
multer = require("multer");
const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require("../helpers/error_helper");

const imageFilter = (req, file, cb) => {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
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
    cb(null, name + "." + ext);
  }
});

module.exports = (req, res, next) => {
  multer({ storage: storage, fileFilter: imageFilter }).single("image")(
    req,
    res,
    err => {
      console.log("multer error", err);

      if (err)
        return next(
          createError({
            status: CONFLICT,
            message: err
          })
        );
      next();
    }
  );
};
