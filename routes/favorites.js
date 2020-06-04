var router = require('express').Router();
var favCtrl = require('../controllers/favorites');

// router.get('/', favCtrl.index); 

// Gifs favorite
router.post('/gifs/:id/favorites', favCtrl.addGifFav)

//delete Gif favorite
router.delete('/gifs/:id/favorites', favCtrl.removeGifFav)

// Videos favorite
router.post('/videos/:id/favorites', favCtrl.addVidFav)

// delete Video favorite
router.delete('/videos/:id/favorites', favCtrl.removeVidFav)


module.exports = router;
