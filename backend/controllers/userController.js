const userModel = require('../models/userModel');

exports.registerUser = (req, res) => {
  const { username, password, email } = req.body;
  userModel.create({ username, password, email }, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error registering user', err });
    } else {
      res.status(201).send({ message: 'User registered successfully' });
    }
  });
};