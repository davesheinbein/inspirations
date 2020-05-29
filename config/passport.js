const passport = require('passport');
const Student = require('../models/student')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 


// passport.use - plugs in a strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
        // a user has logged in with OAuth...
        Student.findOne({googleId: profile.id}, function(err, student) {
            if (err) return cb(err);
            if (student) {
                // returning student
                if (student.avatar) {
                    return cb(null, student);
                } else {
                    student.avatar = profile.photos[0].value;
                    student.save(function(err) {
                        return cb(null, student);
                    });
                }
            } else {
                // we have a new student loging in for the first time
                const newStudent = new Student ({
                    name: profile.displayName,
                    email: profile.emails[0].value, // emails[0] selects the primary email from a string
                    googleId: profile.id
                });
                newStudent.save(function(err) {
                    if (err) return cb(err);
                    return cb(null, newStudent);
                });
            }
        })
  }
));

// passport.serializeUser - is called everytime a user logs in
passport.serializeUser(function(student, done) {
    return done(null, student._id)
});

// passport.deserializeUser - is called with every users request
passport.deserializeUser(function(id, done) {
    Student.findById(id, function(err, student) {
        return done(err, student);
    });
});