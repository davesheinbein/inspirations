const Gif = require('../models/gif');

module.exports = {
  index,
  addGif,
  delGif
};

function index(req, res, next) {
    // Make the query object to use with Gif.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    Gif.find(modelQuery)
    .sort(sortKey).exec(function(err, gifs) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render('gifs/index', { 
        gifs, 
        name: req.query.name, 
        sortKey,
        user: req.user // <==== new
      });
    });
  }

// req.user - is our logged in user
function addGif(req, res, next) {
  
}

function delGif(req, res, next) {

}
