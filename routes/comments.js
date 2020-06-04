const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");

router.post("/gifs/:id/comments", isLoggedIn, commentsCtrl.createGifComment);

router.post("/videos/:id/comments", isLoggedIn, commentsCtrl.createVidComment);

router.delete("/gifs/:gid/comments/:id", commentsCtrl.deleteGifComment);

router.delete("/videos/:vid/comments/:id", commentsCtrl.deleteVidComment);

router.put("/gifs/:id/comments/:cid", commentsCtrl.updateGifCom);

router.put("/videos/:id/comments/:comid", commentsCtrl.updateVidCom);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/google");
  }
}

module.exports = router;
