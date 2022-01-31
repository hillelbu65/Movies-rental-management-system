const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscription =  new Schema ({
    memberId: String,
    movies: [Object],
});

module.exports = mongoose.model('subscriptions', subscription)