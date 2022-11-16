const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        discount_percentage: {
            type: Number,
            required: true
        },
        weight_in_grams: {
            type: Number,
            required: true
        }
    });

module.exports = mongoose.model('Product', productSchema);