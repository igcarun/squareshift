const mongoose = require('mongoose');

var mongo_URI = 'mongodb+srv://arunkumar:arunkumar@squareshift.r3v59pu.mongodb.net/?retryWrites=true&w=majority'


const connectDB = async () => {
    try {
    const connection = await mongoose.connect(mongo_URI);
    console.log('Connection successfully established : %j', connection.connection.host);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;

