require("dotenv").config();
const jwt = require("jsonwebtoken");
const handleUserVerification = (req, res, next) => {
  try {
    // Cookie থেকে token পেতে হবে
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    // Token verify করা
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded user data request এ attach করা
    next(); // Proceed to next middleware or route
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = { handleUserVerification };
