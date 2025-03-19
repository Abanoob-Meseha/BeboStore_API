const multer = require("multer");
const path = require("path");
const AppError = require("../utils/AppError");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      return cb(new AppError(400 ,"Images only (jpeg, jpg, png, gif , webp)"), false);
    }
  },
})

module.exports = upload ;
