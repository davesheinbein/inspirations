const User = require('../models/user');
const Video = require('../models/video');

module.exports = {
  index,
  create,
  show,
  newVid,
  delVid
};

function index(req, res) {
  let user = null
  if(req.user) {
    user = req.user
  }
    Video.find({}, function(err, videos) {
      res.render('videos/index', 
      {
        videos, 
        title: 'Video', 
        user
      });
    });
}

function create(req, res) {
  console.log(req.body);
  Video.create(req.body);
    res.redirect('/videos');
}

function show(req, res) { 
    User.findById(req.params.id, function(err, video) { // changed gif to video in function
      Video.find({video : video._id}, function(err, videos) { // changed gif to video in funtion
        res.render('/videos/show', { title: 'Video Details', video, videos}); // changed gif to video & gifs to videos
      });
    });
}

function newVid(req, res, next) {
    res.render('videos/new');
}

function delVid(req, res, next) {
    Video.deleteOne({'_id' : req.params.id}, function(err, deleteFunction){
      res.redirect('/videos')
    });
}