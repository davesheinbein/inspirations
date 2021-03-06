const User = require("../models/user");
const Video = require("../models/video");

module.exports = {
  index,
  create,
  show,
  newVid,
  delVid,
};

function index(req, res) {
  let user = null;
  if (req.user) {
    user = req.user;
  }
  Video.find()
    .populate("comments comments.createdby")
    .exec(function (err, videos) {
      res.render("videos/index", {
        videos,
        title: "Vid",
        user,
      });
    });
}

function create(req, res) {
  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }
  const videoId = getId(req.body.src);
  req.body.src = `//www.youtube.com/embed/${videoId}`;
  req.body.createdby = req.user._id;
  Video.create(req.body, function (err, video) {
    res.redirect("/videos");
  });
}

function show(req, res) {
  User.findById(req.params.id, function (err, video) {
    Video.find({ video: video._id }, function (err, videos) {
      res.render("/videos/show", { title: "Video Details", video, videos }); 
    });
  });
}

function newVid(req, res, next) {
  res.render("videos/new");
}

function delVid(req, res, next) {
  Video.deleteOne({ _id: req.params.id }, function (err, deleteFunction) {
    res.redirect("/videos");
  });
}
