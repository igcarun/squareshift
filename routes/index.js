var express = require('express');
var router = express.Router();
var axios = require('axios');
const { addItem, getItems, deleteItems, checkoutValue } = require('../controllers/item');
const { addDistance, getDistances } = require('../controllers/distance');

/* GET home page. */
router.post('/item', addItem);

router.get('/items', getItems);

router.post('/items', deleteItems);

router.post('/checkout_value', checkoutValue);

router.post('/distance', addDistance);

router.get('/distances', getDistances)

module.exports = router;
