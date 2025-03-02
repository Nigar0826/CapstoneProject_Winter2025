const catalogModel = require('../models/catalogModel');

exports.getCatalog = (req, res) => {
  catalogModel.getAll((err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching catalog', err });
    } else {
      res.status(200).send({ catalog: results });
    }
  });
};
