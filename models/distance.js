const mongoose = require('mongoose');

const distanceSchema = mongoose.Schema(
    {
        distMin: {
            type: Number,
            required: true
        },
        distMax: {
            type: Number,
            required: true
        },
        weightMin: {
            type: Number,
            required: true
        },
        weightMax: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    });

module.exports = mongoose.model('Distance', distanceSchema);