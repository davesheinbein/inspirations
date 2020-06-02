const passport = require('passport');
const User = require('../models/user')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 


// passport.use - plugs in a strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
        // a user has logged in with OAuth...
        User.findOne({googleId: profile.id}, function(err, user) {
            if (err) return cb(err);
            if (user) {
                // returning user
                if (user.avatar) {
                    return cb(null, user);
                } else {
                    user.avatar = profile.photos[0].value;
                    user.save(function(err) {
                        return cb(null, user);
                    });
                }
            } else {
                // we have a new user loging in for the first time
                const newUser = new User ({
                    name: profile.displayName,
                    email: profile.emails[0].value, // emails[0] selects the primary email from a string
                    googleId: profile.id
                });
                newUser.save(function(err) {
                    if (err) return cb(err);
                    return cb(null, newUser);
                });
            }
        })
  }
));

// passport.serializeUser - is called everytime a user logs in
passport.serializeUser(function(user, done) {
    return done(null, user._id)
});

// passport.deserializeUser - is called with every users request
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        return done(err, user);
    });
});