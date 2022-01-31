const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movie =  new Schema ({
    name : String,
    genres : Array,
    image : String,
    premiered : Date
});

module.exports = mongoose.model('movies', movie)