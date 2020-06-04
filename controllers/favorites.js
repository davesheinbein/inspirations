// const Favorite = require('../models/favorites');
// const Video = require('../models/video');
const Gif = require('../models/gif')
const User = require('../models/user');

module.exports = {
  index,
  addGifFav,
  removeGifFav
};

function index(req, res) {
  let user = null
  if(req.user) {
    user = req.user
  }
    User.find({}, function(err, favorites) {
      res.render('favorites/index', 
      {
        favorites, 
        title: 'spirations', 
        user
      });
    });
}

function addGifFav(req, res) {
  Gif.findById(req.params.id, function(err, gif) {
    // console.log(gif, "gif");
    req.user.favoriteGifs.push(req.params.id);
    // console.log(req.user.favoriteGifs, "req.user.favoriteGifs");
    req.user.save(function(err){
      res.redirect(`/gifs`)
    })
  })
}

function removeGifFav(req, res) {
  const gifIdx = req.user.favoriteGifs.findIndex(g => g.equals(req.params.id))
  req.user.favoriteGifs.splice(gifIdx, 1);
  req.user.save(function(err){
    // console.log(err, "error");
    res.redirect(`/gifs`);
  });  
}


