var express = require('express');
var session = require('express-session');
var passport = require('passport');
var githubStrategy = require('passport-github2').Strategy;
var config = require('./config')

var app = express();

app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


//github strategy//
passport.use('github', new githubStrategy({
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
})

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/home');
  });


app.listen(3000, function(){
  console.log('listening on 3000')
})
