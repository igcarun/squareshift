// cart items
// {
//     "product_id": 101,
//     "description": "Name of Product 1",
//     "quantity": 4
// }

// product

// {
//     "id": 1,
//     "name": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg,",
//     "discount_percentage": "3.2,",
//     "weight_in_grams": "670,"
//   }

const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
    {
        product_id: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    });

module.exports = mongoose.model('Item', itemSchema);