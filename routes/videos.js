var router = require('express').Router();
var videosCtrl = require('../controllers/videos');

/* GET home page. */
router.get('/', videosCtrl.index)

router.get('/new', videosCtrl.newVid)

router.post('/', videosCtrl.create)

router.delete("/:id", videosCtrl.delVid)

module.exports = router;
