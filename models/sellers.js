const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sellerSchema = new Schema({
    lastname: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    }
},  {
        timestamps: true
});

var Sellers = mongoose.model('Seller', sellerSchema);

module.exports = Sellers;
