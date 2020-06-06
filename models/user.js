const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: String,
    email: String,
    avatar: String,
    favoriteGifs: [{ type: Schema.Types.ObjectId, ref: "Gif" }],
    favoriteVideos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    googleId: String, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
