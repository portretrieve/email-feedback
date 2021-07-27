const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const UserModel = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //check if user already exists with profile.id
      UserModel.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //User Already Exists
          done(null, existingUser);
        } else {
          //Create a new User
          new UserModel({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
