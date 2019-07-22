/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const Users = require('./users/users-model.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post('/api/register', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);

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

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
