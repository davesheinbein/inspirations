const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');


router.post('/gifs/:id/comments', commentsCtrl.createGifComment);

router.post('/videos/:id/comments', commentsCtrl.createVidComment);

// new
router.delete('/gifs/:gid/comments/:id', commentsCtrl.deleteGifComment);

router.delete('/videos/:vid/comments/:id', commentsCtrl.deleteVidComment);
// ^^^^

module.exports = router;