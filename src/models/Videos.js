const mongoose = require("mongoose");

const Videos = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  views: {
    required: true,
    type: Number,
  },
  likes: {
    required: true,
    type: Number,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  description: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Videos", Videos);
