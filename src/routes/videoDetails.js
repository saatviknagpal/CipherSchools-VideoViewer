const express = require("express");
const router = express.Router();
const Videos = require("../models/Videos");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const find = await Videos.findById(id).populate({
      path: "comments",
      populate: {
        path: "replies",
        model: "Replies",
      },
    });

    return res.status(200).json({
      status: "success",
      videoDetails: find,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = router;
