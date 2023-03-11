const express = require("express");
const router = express.Router();
const Videos = require("../models/Videos");
const Comment = require("../models/Comment");
const Users = require("../models/Users");

router.post("/", async (req, res) => {
  const { description, video_id } = req.body;
  try {
    const profile = await Users.findById(req.userData._id);
    const comment = new Comment({
      profile_name: req.userData.name,
      video_id,
      content: description,
    });

    const videoComment = await comment.save();

    const findVideo = await Videos.findByIdAndUpdate(
      {
        _id: video_id,
      },
      {
        $push: {
          comments: videoComment._id,
        },
      },
      { new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      status: "success",
      comment: videoComment,
      message: "Comment Successfully Added",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = router;
