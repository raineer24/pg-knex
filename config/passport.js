const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/users");
const keys = require("../config/keys");
const isProduction = process.env.NODE_ENV === 'production';
const secret = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secret_key;
opts.secretOrKey = secret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.query()
        .findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log("jwt err", err));
    })
  );
};
