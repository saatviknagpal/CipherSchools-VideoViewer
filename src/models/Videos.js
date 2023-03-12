const mongoose = require("mongoose");

const Videos = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
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
      default: 0,
    },
    uploaded_by: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    likes: {
      // required: true,
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Videos", Videos);
