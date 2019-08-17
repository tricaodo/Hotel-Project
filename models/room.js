const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});
module.exports = mongoose.model('Room', roomSchema);