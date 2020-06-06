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

// OAuth 
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

module.exports = router;
