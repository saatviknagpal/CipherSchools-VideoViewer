const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "media/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, "_"));
  },
});
const upload = multer({
  storage,
  limit: {
    filesize: 1024 * 1024 * 50,
  },
});

router.post("/", upload.single("file"), async (req, res, next) => {
  return await res.status(200).json({
    status: "success",
    message: "Video Uploaded Successfully",
  });
});

module.exports = router;
