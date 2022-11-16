const mongoose = require('mongoose');

const warehouseSchema = mongoose.Schema(
    {
        postal_code: {
            type: Number,
            required: true
        },
        distance_in_kilometers: {
            type: Number,
            required: true
        }
    });

module.exports = mongoose.model('Warehouse', warehouseSchema);