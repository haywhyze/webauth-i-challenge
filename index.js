/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
// const bcrypt = require('bcryptjs');
const Users = require('./users/users-model.js');
const sillyBcrypt = require('./sillyBcrypt');
const checkCredentialsInBody = require('./checkCredentialsInBody');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post('/api/register', (req, res) => {
  const user = req.body;
  // user.password = bcrypt.hashSync(user.password, 12);
  user.password = sillyBcrypt.hash(user.password, 10);
  Users.add(user)
    .then((saved) => {
      res.status(201).json({
        id: saved.id,
        username: saved.username,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.post('/api/login', checkCredentialsInBody, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.username}!` });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
