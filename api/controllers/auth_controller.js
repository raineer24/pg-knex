const User = require("../../models/users");
const Promise = require("bluebird");
const bcrypt = require("bcryptjs");
const log = require("color-logs")(true, true, "User Account");

//const postLogin = ()

const postLogin = (req, res, next) => {
  const email = String(req.body.email);
  const password = String(req.body.password);
  console.log(req.body);

  User.query()
    .where("email", email)
    .first()
    .then(user => {
      console.log(`user!: `, user);

      if (!user) {
        return Promise.reject(new Error("User not found"));
      }
      return Promise.resolve(user);
    });

  // let user = await _findUserByEmail({ email });
  //console.log(user);

  // try {
  //   let user = await _findUserByEmail({ email });
  //   console.log(user);

  //   const isMatch = await bcrypt.compare(password, user.password);

  //   const payload = { id: user.id, email: user.email };
  //   jwt.sign(
  //     payload,
  //     process.env.SECRET_KEY,
  //     { expiresIn: "1h" },
  //     (err, token) => {
  //       if (err) throw err;
  //       log.info(`Logged into user account ${user.email}`);
  //       res.status(200).json({ message: " Auth Successful", token: token });
  //     }
  //   );
  // } catch (err) {
  //   log.error(err.message);
  //   res.status(500).send(`Server error: ${err.message}`);
  // }
  // if (!isMatch) {
  //   return res.status(400).json({ errors: [{ msg: "Password incorrect" }] });
  // }
};

const _findUserByEmail = email => {
  User.query()
    .where("email", email)
    .first()
    .then(user => {
      console.log(`user!: `, user);

      if (!user) {
        return Promise.reject(new Error("User not found"));
      }
      return Promise.resolve(user);
    });
};

const getCurrent = (req, res, next) => {
  res
    .send({
      message: "Welcome Test Development"
    })
    .catch(next);
};

module.exports = { getCurrent, postLogin };
