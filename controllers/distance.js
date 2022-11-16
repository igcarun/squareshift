const Distance = require("../models/distance");
const shipping = require('../shipping.json');

const addDistance = (req, res) => {
    const distance = new Distance({
        distMin: req.body.distMin,
        distMax: req.body.distMax,
        weightMin: req.body.weightMin,
        weightMax: req.body.weightMax,
        amount: req.body.amount
    });
    distance.save((err, item) => {
        if (err) {
            res.send(err);
        }
        res.send(item);
    });
};

const getDistances = (req, res) => {
    Distance.find().then(distances => {
        res.json(distances);
    }).catch(error => res.json(error));
};

module.exports = {
    addDistance,
    getDistances
}