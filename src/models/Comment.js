const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  profile_name: {
    type: String,
    required: true,
  },
  video_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Replies",
    },
  ],
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
