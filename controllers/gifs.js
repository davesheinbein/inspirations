const User = require('../models/user');
const Gif = require('../models/gif')

module.exports = {
  index,
  newGif,
  show,
  create,
  delGif
};

function index(req, res, next) {
    Gif.find({}).exec(function(err, gifs) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render('gifs/index', { 
        gifs, 
        user: req.user, // req.user - is our logged in user
        title: 'Gifs'
        });
    });
}

function create(req, res) {
  console.log(req.body);
  Gif.create(req.body);
    res.redirect('/gifs');
}

function show(req, res) {
    User.findById(req.params.id, function(err, gif) {
      Gif.find({gif : gif._id}, function(err, gifs) {
        res.render('/gifs/show', { title: 'Gif Details', gif, gifs});
      });
    });
}

function newGif(req, res, next) {
    res.render('gifs/new');
}

function delGif(req, res, next) {
    Gif.deleteOne({'_id' : req.params.id}, function(err, deleteFunction){
      res.redirect('/gifs')
    });
}
