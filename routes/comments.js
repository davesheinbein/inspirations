const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");

router.post("/gifs/:id/comments", isLoggedIn, commentsCtrl.createGifComment);

router.post("/videos/:id/comments", isLoggedIn, commentsCtrl.createVidComment);

router.delete("/gifs/:gid/comments/:id", commentsCtrl.deleteGifComment);

router.delete("/videos/:vid/comments/:id", commentsCtrl.deleteVidComment);

// router.get('/gifs/:id/edit', commentsCtrl.editGifCom)

// router.put("/gifs/:id", commentsCtrl.updateGifCom);

// router.get('/videos/:id/edit', commentsCtrl.editVidCom)

// router.put("/videos/:id", commentsCtrl.updateVidCom);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/google");
  }
}

module.exports = router;
