const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "failed",
      message: "Access denied",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user; // Attach the decoded user information to the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admins only region!! You are not allowed",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticateToken, isAdmin };
