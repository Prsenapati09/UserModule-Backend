const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    required: true,
    type: String,
  },
  publicId: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user.model",
    required:true
  }
},{timestamps:true});

const image = mongoose.model("Image", imageSchema);

module.exports = image;
