const upload = require("../config/multer");

const multerFileBuffer = (filesNumber) => {
  return (req, res, next) => {
    upload.array("images", filesNumber)(req, res, (error) => {
      if (error) {
        return res.status(400).json({
            success: false ,
            message: "Problem in Bufferring images ... you exceeded the files number limit"
        })
      }
      next(); // Continue to the next middleware
    });
  };
};

module.exports = multerFileBuffer;
