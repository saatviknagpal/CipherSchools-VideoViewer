const express = require("express");
const router = express.Router();

const User = require("../models/Users");
const Videos = require("../models/Videos");

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateViews = await Videos.findByIdAndUpdate(id, {
      $inc: { views: 1 },
    });

    return res.status(200).json({
      status: "success",
      message: "View increased",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
