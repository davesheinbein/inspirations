var router = require("express").Router();
var favCtrl = require("../controllers/favorites");

router.get("/favorites", favCtrl.index);

// Gifs favorite
router.post("/gifs/:id/favorites", isLoggedIn, favCtrl.addGifFav);

//delete Gif favorite
router.delete("/gifs/:id/favorites", isLoggedIn, favCtrl.removeGifFav);

// Videos favorite
router.post("/videos/:id/favorites", isLoggedIn, favCtrl.addVidFav);

// delete Video favorite
router.delete("/videos/:id/favorites", isLoggedIn, favCtrl.removeVidFav);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/google");
  }
}

module.exports = router;
