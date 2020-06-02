var router = require('express').Router();
var favCtrl = require('../controllers/favorites');

router.get('/', favCtrl.index); 

// router.get('/:id', favCtrl.show)

module.exports = router;
