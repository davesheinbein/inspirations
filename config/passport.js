const passport = require('passport');
const Gif = require('../models/gif')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 


// passport.use - plugs in a strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
        // a user has logged in with OAuth...
        Gif.findOne({googleId: profile.id}, function(err, gif) {
            if (err) return cb(err);
            if (gif) {
                // returning gif
                if (gif.avatar) {
                    return cb(null, gif);
                } else {
                    gif.avatar = profile.photos[0].value;
                    gif.save(function(err) {
                        return cb(null, gif);
                    });
                }
            } else {
                // we have a new gif loging in for the first time
                const newGif = new Gif ({
                    name: profile.displayName,
                    email: profile.emails[0].value, // emails[0] selects the primary email from a string
                    googleId: profile.id
                });
                newGif.save(function(err) {
                    if (err) return cb(err);
                    return cb(null, newGif);
                });
            }
        })
  }
));

// passport.serializeUser - is called everytime a user logs in
passport.serializeUser(function(gif, done) {
    return done(null, gif._id)
});

// passport.deserializeUser - is called with every users request
passport.deserializeUser(function(id, done) {
    Gif.findById(id, function(err, gif) {
        return done(err, gif);
    });
});