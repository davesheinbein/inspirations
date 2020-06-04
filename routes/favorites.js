var router = require('express').Router();
var favCtrl = require('../controllers/favorites');

// router.get('/', favCtrl.index); 

router.post('/gifs/:id/favorites', favCtrl.addGifFav)

router.delete('/gifs/:id/favorites', favCtrl.removeGifFav)

// router.get('/:id', favCtrl.show)

module.exports = router;
