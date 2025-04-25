const express = require("express");
const {
  handleUserRegistration,
  handleUserLogin,
  handleGetSingleUser,
  handleLogOutUser,
} = require("../controllers/controller.user");
const { handleUserVerification } = require("../controllers/cheakhUserAuth");
const router = express.Router();

// user routes
router.post("/register", handleUserRegistration);
router.post("/login", handleUserLogin);

// protected routes for user
router.use("/", handleUserVerification); // middleware for verification
router.get("/user/:id", handleGetSingleUser);
router.post("/logout", handleLogOutUser);

// error middleware
router.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: err.message,
  });
  next();
});
module.exports = router;
