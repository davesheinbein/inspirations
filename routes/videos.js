var router = require("express").Router();
var videosCtrl = require("../controllers/videos");

/* GET home page. */
router.get("/", videosCtrl.index);

router.get("/new", videosCtrl.newVid);

router.post("/", isLoggedIn, videosCtrl.create);

router.delete("/:id", isLoggedIn, videosCtrl.delVid);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/google");
  }
}

module.exports = router;
