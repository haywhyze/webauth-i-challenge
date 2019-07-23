const Users = require('./users/users-model.js');
const sillyBcrypt = require('./sillyBcrypt');

function checkCredentialsInBody(req, res, next) {
  const { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && sillyBcrypt.compare(password, user.password)) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

module.exports = checkCredentialsInBody;
