const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
app.use(session({secret:"secret"}))
app.use(passport.session()); 

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "933035260970-thrdcbf76lj39812o5l2ad3q658507uv.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  (accessToken, refreshToken, profile, cb)=> {
   console.log(profile);
      return cb(null, profile);
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google'),
  function(req, res) {
    
    res.send("Welcome");
  });

passport.serializeUser((user,done)=>{
    return done(null,user);
}

)
passport.deserializeUser((user,done)=>{
    return done(null,user);
})

app.listen(8080,()=>{
    console.log("listening on port 8080");
});