const User = require("../models/user");
const Gif = require("../models/gif");

module.exports = {
  index,
  newGif,
  show,
  create,
  delGif,
};

function index(req, res, next) {
  Gif.find({})
    .populate("comments comments.createdby")
    .exec(function (err, gifs) {
      if (err) return next(err);
      res.render("gifs/index", {
        gifs,
        user: req.user, 
        title: "Gif",
      });
    });
}

function create(req, res) {
  req.body.createdby = req.user._id;
  Gif.create(req.body, function (err, gif) {
    res.redirect("/gifs");
  });
}

function show(req, res) {
  Gif.findById(req.params.id, function (err, gif) {
    res.render("gifs/index", { title: "Gif Details", gif, user: req.user });
  });
}

function newGif(req, res, next) {
  res.render("gifs/new");
}

function delGif(req, res, next) {
  Gif.deleteOne({ _id: req.params.id }, function (err, deleteFunction) {
    res.redirect("/gifs");
  });
}
