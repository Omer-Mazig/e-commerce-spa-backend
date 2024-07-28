const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getLoggedInUser,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/loggedInUser", verifyToken, getLoggedInUser);

module.exports = router;
