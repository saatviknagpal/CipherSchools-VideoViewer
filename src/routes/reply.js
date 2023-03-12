const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Users = require("../models/Users");
const Replies = require("../models/Replies");

router.post("/", async (req, res) => {
  const { description, comment_id } = req.body;
  try {
    const reply = new Replies({
      profile_name: req.userData.name,
      comment_id,
      content: description,
    });

    const commentReply = await reply.save();

    const findComment = await Comment.findByIdAndUpdate(
      {
        _id: comment_id,
      },
      {
        $push: {
          replies: commentReply._id,
        },
      },
      { new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      status: "success",
      reply: commentReply,
      message: "Reply Successfully Added",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = router;
