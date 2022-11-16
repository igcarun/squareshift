const Item = require("../models/item");
var axios = require('axios');
const shipping = require('../shipping.json');
const e = require("express");

const addItem = async (req, res) => {

    try {
        const product = await axios.get(`https://e-commerce-api-recruitment.herokuapp.com/product/${req.body.product_id}`);
        if (product) {
            const item = new Item({
                product_id: req.body.product_id,
                description: req.body.description,
                quantity: req.body.quantity
            });

            item.save((err, item) => {
                if (err) {
                    res.send(err);
                }
                res.send([
                    {
                        status: "success",
                        message: "Item has been added to cart"
                    }
                ]);
            });
        }
    } catch {
        res.send([
            {
                status: "error",
                message: "Invalid product id"
            }
        ])
    }

};

const getItems = (req, res) => {
    Item.find().then(items => {
        res.send([
            {
                status: "success",
                message: "Item available in the cart",
                items
            }
        ]);
    }).catch(error => res.json(error));
};


const deleteItems = (req, res) => {
    if (req.body && req.body.action === 'empty_cart') {
        Item.deleteMany().then((resp) => {
            res.send([
                {
                    status: "success",
                    message: "All items have been removed from the cart !"
                }
            ]);
        }).catch(err => res.send(err));
    } else {
        res.send('Please add the action in requst body');
    }
}

const checkoutValue = async (req, res) => {
    if (req.body && req.body.shipping_postal_code) {
        // get Distance
        const getDistance = await axios.get(`https://e-commerce-api-recruitment.herokuapp.com/warehouse/distance?postal_code=${req.body.shipping_postal_code}`);
        const km = getDistance.data && getDistance.data.distance_in_kilometers;

        // get all cartItems
        const cartItems = await Item.find();
        if (cartItems.length > 0) {
            let productApis = [], products, totalAmount = 0, totalWeight = 0;
            cartItems.forEach(item => {
                productApis.push(axios.get(`https://e-commerce-api-recruitment.herokuapp.com/product/${item.product_id}`));
            });
            await axios.all(productApis).then(results => {
                products = results.map(result => result.data.product);
            });

            cartItems.forEach(item => {
                const product = products.find(product => product.id == item.product_id);

                // find discount percentage for a product price
                const originalPrice = (product.price - (product.price * (product.discount_percentage / 100)));

                totalAmount += (item.quantity * originalPrice);
                totalWeight += (item.quantity * product.weight_in_grams);

            });

            // weight convert to kg
            totalWeight /= 1000;

            // find shipping and weight charge
            shipping.forEach(element => {
                if (km >= element.distMin && (km <= element.distMax || element.distMax == -1) &&
                    totalWeight >= element.weightMin && (totalWeight <= element.weightMax || element.weightMax == -1)) {
                    totalAmount += element.Amount;
                }
            });

            res.send([
                {
                    status: 'success',
                    message: `Total value of your shopping cart is - $${totalAmount}`
                }
            ]);
        } else {
            res.send([
                {
                    status: 'success',
                    message: 'There is no cart Items. Please add item to cart and try again...'
                }
            ]);
        }

    } else {
        res.send('Please add the Shipping postal code');
    }
}


module.exports = {
    addItem,
    getItems,
    deleteItems,
    checkoutValue
}