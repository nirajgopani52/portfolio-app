// file name:header.ejs
// student name: NirajKumar Gopani
// student number: 301159058
// date:10-21-2020

const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");

//Authentication
module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, { message: "Sorry, we don't recognize that username." });
                done(null, user)
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

};
