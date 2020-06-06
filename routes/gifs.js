var router = require("express").Router();
var gifsCtrl = require("../controllers/gifs");

/* GET gifs listing. */
router.get("/", gifsCtrl.index);

router.get("/new", gifsCtrl.newGif);

router.post("/", isLoggedIn, gifsCtrl.create);

router.delete("/:id", isLoggedIn, gifsCtrl.delGif);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/google");
  }
}

module.exports = router;
