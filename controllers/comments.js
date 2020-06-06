const Gif = require("../models/gif");
const Video = require("../models/video");

module.exports = {
  createGifComment,
  deleteGifComment,
  createVidComment,
  deleteVidComment,
  updateGifCom,
  updateVidCom,
};

// Gifs
function createGifComment(req, res) {
  req.body.createdby = req.user._id;
  Gif.findById(req.params.id, function (err, gif) {
    gif.comments.push(req.body);
    gif.save(function (err, gif) {
      res.redirect(`/gifs`);
    });
  });
}

function deleteGifComment(req, res) {
  Gif.findOne({ "comments._id": req.params.id }, function (err, gif) {
    const comment = gif.comments.id(req.params.id);
    comment.remove();
    gif.save(function (err) {
      res.redirect(`/gifs`);
    });
  });
}

function updateGifCom(req, res) {
  Gif.findById(req.params.id, function (err, gif) {
    var comment = gif.comments.id(req.params.cid);
    comment.content = req.body.content;
    gif.save(function (err) {
      comment.save(function (e) {
        res.redirect("/gifs");
      });
    });
  });
}

// videos
function createVidComment(req, res) {
  req.body.createdby = req.user._id;
  Video.findById(req.params.id, function (err, video) {
    video.comments.push(req.body);
    video.save(function (err, video) {
      res.redirect(`/videos`);
    });
  });
}

function deleteVidComment(req, res) {
  Video.findOne({ "comments._id": req.params.id }, function (err, video) {
    const comment = video.comments.id(req.params.id);
    comment.remove();
    video.save(function (err) {
      res.redirect(`/videos`);
    });
  });
}

function updateVidCom(req, res) {
  Video.findById(req.params.id, function (err, video) {
    var comment = video.comments.id(req.params.comid);
    comment.content = req.body.content;
    video.save(function (err) {
      comment.save(function (e) {
        res.redirect("/videos");
      });
    });
  });
}
