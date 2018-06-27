const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create ninja Schema
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    }
    // add in geolocation
});

//create ninja Model
const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;