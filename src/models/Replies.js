const mongoose = require("mongoose");

const repliesSchema = new mongoose.Schema({
  profile_name: {
    type: String,
    required: true,
  },
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Replies || mongoose.model("Replies", repliesSchema);
