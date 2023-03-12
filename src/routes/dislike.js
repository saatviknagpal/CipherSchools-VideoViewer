const express = require("express");
const router = express.Router();

const User = require("../models/Users");
const Videos = require("../models/Videos");

router.put("/:id", async (req, res, next) => {
  const { userId } = req.userData;
  const { id } = req.params;
  try {
    const updateDislike = await Videos.findByIdAndUpdate(id, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    });

    return res.status(201).json({
      status: "success",
      message: "Dislike added",
      updateDislike,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
