const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");

const storage = require("../lib/multer");

router.post("/", storage.single("file"), uploadController.uploadVideo);

module.exports = router;
