const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Login1 = mongoose.model("Login1");
const config = require('config');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //accepts a request as the only parameter
opts.secretOrKey = config.get('secretOrKey'); //string or buffer containing the secret

module.exports = passport => {
    passport.use(
        new jwtStrategy(opts, (jwt_payload, done) => { //options to control how the token is extracted from the request or verified
          Login1.findById(jwt_payload.id) //an object literal containing the decoded JWT payload
            .then((user) => {
              if (user) {
                return done(null, user);
              }
              return done(null, false);
            })
            .catch((err) => console.log(err));
        })
    );
};