const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var priceSchema = new Schema({
    container: {
        type: String,
        required: true,
    },
    retail: {
        type: Currency,
        required: true,
        min: 0
    },
    wholesale: {
        type: Currency,
        required: true,
        min: 0
    }
},  {
        timestamps: true
});

var Prices = mongoose.model('Price', priceSchema);

module.exports = Prices;

