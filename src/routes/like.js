const express = require("express");
const router = express.Router();

const User = require("../models/Users");
const Videos = require("../models/Videos");

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.userData;
  try {
    const updateLike = await Videos.findByIdAndUpdate(id, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId },
    });

    return res.status(201).json({
      status: "success",
      message: "Like added",
      updateLike,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
