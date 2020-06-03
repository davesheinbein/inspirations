const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.get('/gifs/index', commentsCtrl.showGif)

router.post('/gifs/:id/comments', commentsCtrl.createGifComment);

// new
// router.delete('/comments/:id', commentsCtrl.deleteGifComment);
// ^^^^

module.exports = router;