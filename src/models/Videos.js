const mongoose = require("mongoose");

const Videos = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
  views: {
    // required: true,
    type: Number,
  },
  cloudinary_id: {
    type: String,
  },
  likes: {
    // required: true,
    type: Number,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Videos", Videos);
