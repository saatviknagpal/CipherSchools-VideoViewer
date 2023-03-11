const Videos = require("../models/Videos");
const cloudinary = require("../lib/cloudinary");

exports.uploadVideo = (req, res) => {
  cloudinary.uploader.upload(
    req.file.path,
    {
      resource_type: "video",
      folder: "video",
    },

    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      var upload = new Videos({
        title: req.file.originalname,
        url: result.url,
        uploaded_by: req.userData.name,
        cloudinary_id: result.public_id,
        description: req.body.description,
      });
      upload.save();

      try {
        return res.status(200).json({
          status: "success",
          message: "Video Uploaded Successfully",
          data: result,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          status: "fail",
          message: err.message,
        });
      }
    }
  );
};
