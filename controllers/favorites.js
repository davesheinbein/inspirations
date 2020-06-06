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
  if (user) {
    User.findById(user._id)
      .populate("favoriteVideos")
      .populate("favoriteGifs")
      .exec(function (err, user) {
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
    req.user.favoriteGifs.push(req.params.id);
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
    res.redirect(`/gifs`);
  });
}

// videos
function addVidFav(req, res) {
  Video.findById(req.params.id, function (err, video) {
    req.user.favoriteVideos.push(req.params.id);
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
    res.redirect(`/videos`);
  });
}
