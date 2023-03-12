const express = require("express");
const checkauth = require("../middlewares/checkauth");
const router = express.Router();
const Videos = require("../models/Videos");

router.get("/", async (req, res) => {
  try {
    const allVideos = await Videos.find().exec();
    res.status(200).json({
      status: "success",
      allVideos,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

router.get("/:id", checkauth, async (req, res) => {
  const { id } = req.params;

  try {
    const myVideo = await Videos.find({ user_id: id });
    res.status(200).json({
      status: "success",
      myVideo,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = router;
