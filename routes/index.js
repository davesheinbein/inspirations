var router = require("express").Router();
const passport = require("passport");

// The root route renders our only view
router.get("/", function (req, res) {
  let user = null;
  if (req.user) {
    user = req.user;
  }
  res.render("index", { user, title: "spirations" });
});

// OAuth v
// Login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/gifs",
    failureRedirect: "/gifs",
  })
);

// logout route
router.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/gifs");
});

// OAuth ^

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
