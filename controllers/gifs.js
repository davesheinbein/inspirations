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
        title: 'Gif'
        });
    });
}

function create(req, res) {
  console.log(req.body);
  Gif.create(req.body);
    res.redirect('/gifs');
}

function show(req, res) {
  Gif.findById(req.params.id, function(err, gif) {
    res.render('gifs/index', { title: 'Gif Details', gif, user: req.user});
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
