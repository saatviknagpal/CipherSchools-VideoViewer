const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/Users");

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const emailExist = await User.findOne({ email });
  if (!emailExist) {
    return res.status(401).json({
      status: "fail",
      error: "emailError",
      message: "Email is not registered, Sign Up first",
      isLoggedIn: false,
    });
  }
  try {
    const auth = await bcrypt.compare(password, emailExist.password);
    if (auth) {
      return res.status(200).json({
        status: "success",
        message: "Authentication Successful",
      });
    } else {
      throw Error;
    }
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      error: "loginError",
      message: "Your Email or Password is incorrect",
    });
  }
});

module.exports = router;
