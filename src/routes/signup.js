const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/Users");

router.post("/", async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(409).json({
      status: "fail",
      error: "emailError",
      message: "Email is already registered",
    });
  }
  try {
    const salt = await bcrypt.genSalt();
    var passwordhash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: passwordhash,
    });

    // const token = createJWT(user._id);
    // setCookies("devshowcase_jwt", token, {
    //   req,
    //   res,
    //   maxAge: 60 * 60 * 24 * 7,
    // });

    return res.status(201).json({
      status: "success",
      message: "User has successfully registered",
      user: user,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
