const mongoose = require('mongoose');
const localStrategy = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
userSchema.plugin(localStrategy);
module.exports = mongoose.model('User', userSchema);