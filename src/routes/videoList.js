const express = require("express");
const router = express.Router();
const Videos = require("../models/Videos");

router.get("/", async (req, res) => {
  try {
    const allVideos = await Videos.find().exec();
    console.log(allVideos);
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

module.exports = router;
