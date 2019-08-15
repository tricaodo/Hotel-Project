const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hotels', {useNewUrlParser: true});
const roomSchema = new mongoose.Schema({
    name: String,
    image: String
});
module.exports = mongoose.model('Room', roomSchema);