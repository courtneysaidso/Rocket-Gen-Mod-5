const mongoose = require('mongoose')
require('dotenv').config()


const openMongoConnection = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connected to MongoDB");
    });
    mongoose.connect('mongodb+srv://courtneyagregg:GodComplex11@mod5.nsqu7m2.mongodb.net/?retryWrites=true&w=majority&appName=Mod5');
};

mongoose.set('strictQuery', true)

module.exports = {openMongoConnection};
 