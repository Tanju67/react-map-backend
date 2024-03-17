const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurentUser,
} = require("../controllers/auth-controllers");
const checkAuth = require("../middleware/auth");

router.post("/register", register);

router.post("/login", login);

router.get("/currentUser", checkAuth, getCurentUser);

module.exports = router;
