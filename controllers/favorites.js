// const Favorite = require('../models/favorites');
const Video = require("../models/video");
const Gif = require("../models/gif");
const User = require("../models/user");

module.exports = {
  index,
  addGifFav,
  removeGifFav,
  addVidFav,
  removeVidFav,
};

function index(req, res) {
  let user = null;
  if (req.user) {
    user = req.user;
  }
  // console.log(req.user, "req");
  if (user) {
    User.findById(user._id)
      .populate("favoriteVideos")
      .populate("favoriteGifs")
      .exec(function (err, user) {
        // console.log(user, "user");

        res.render("favorites/index", {
          title: "spirations",
          user,
        });
      });
  } else {
    res.render("favorites/index", {
      title: "spirations",
      user: false
    });
  }
}

// Gifs
function addGifFav(req, res) {
  Gif.findById(req.params.id, function (err, gif) {
    // console.log(gif, "gif");
    req.user.favoriteGifs.push(req.params.id);
    // console.log(req.user.favoriteGifs, "req.user.favoriteGifs");
    req.user.save(function (err) {
      res.redirect(`/gifs`);
    });
  });
}

function removeGifFav(req, res) {
  const gifIdx = req.user.favoriteGifs.findIndex((g) =>
    g.equals(req.params.id)
  );
  req.user.favoriteGifs.splice(gifIdx, 1);
  req.user.save(function (err) {
    // console.log(err, "error");
    res.redirect(`/gifs`);
  });
}

// videos
function addVidFav(req, res) {
  Video.findById(req.params.id, function (err, video) {
    // console.log(gif, "gif");
    req.user.favoriteVideos.push(req.params.id);
    // console.log(req.user.favoriteVideos, "req.user.favoriteVideos");
    req.user.save(function (err) {
      res.redirect(`/videos`);
    });
  });
}

function removeVidFav(req, res) {
  const vidIdx = req.user.favoriteVideos.findIndex((vid) =>
    vid.equals(req.params.id)
  );
  req.user.favoriteVideos.splice(vidIdx, 1);
  req.user.save(function (err) {
    // console.log(err, "error");
    res.redirect(`/videos`);
  });
}
