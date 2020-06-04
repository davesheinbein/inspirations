const Gif = require("../models/gif");
const Video = require("../models/video");
const comment = require("../models/user");

module.exports = {
  createGifComment,
  deleteGifComment,
  createVidComment,
  deleteVidComment,
  editGifCom,
  //   updateGifCom,
  //   editVidCom,
  //   updateVidCom
};

// Gifs
function createGifComment(req, res) {
  req.body.createdby = req.user._id;
  Gif.findById(req.params.id, function (err, gif) {
    gif.comments.push(req.body); // Add the comment to the comments array
    gif.save(function (err, gif) {
      res.redirect(`/gifs`);
    });
  });
}

function deleteGifComment(req, res) {
  Gif.findOne({ "comments._id": req.params.id }, function (err, gif) {
    // The embedding lesson has this in the further study section
    // Find the comment subdoc
    const comment = gif.comments.id(req.params.id);
    // Remove the comment subdoc from the array
    comment.remove();
    // Save the gif doc
    gif.save(function (err) {
      // Redirect back to show page of gif
      res.redirect(`/gifs`);
    });
  });
}

function editGifCom(req, res) {
  const Gif = Gif.getOne(req.params.id);
  res.render("/gifs/:id/edit", { gif });
}

// function updateGifCom(req, res) {
//   req.body.comments = !!req.body.comments;
//   Gif.update(req.params.id, req.body);
//   res.redirect(`/gifs/${req.params.id}`);
// }

// ^^^^^^

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
    // The embedding lesson has this in the further study section
    // Find the comment subdoc
    const comment = video.comments.id(req.params.id);
    // Remove the comment subdoc from the array
    comment.remove();
    // Save the gif doc
    video.save(function (err) {
      // Redirect back to show page of gif
      res.redirect(`/videos`);
    });
  });
}
