const upload = require("../config/multer");

const multerFileBuffer = (filesNumber) => {
  return (req, res, next) => {
    upload.array("images", filesNumber)(req, res, (error) => {
      if (error) {
        return res.status(400).json({
            success: false ,
            message: "Bufferring images error ...the files number limit = 3 ,Images only (jpeg, jpg, png, gif , webp) Format"
        })
      }
      next(); // Continue to the next middleware
    });
  };
};

module.exports = multerFileBuffer;
