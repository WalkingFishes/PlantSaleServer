const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var orderSchema = new Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    ordFlower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrdFlower'
    },
    paytype: {
        type: String,
        required: true,
    },
    amount: {
        type: Currency,
        required: true,
        min: 0
    },
    year: {
        type: String,
        required: true
    }
},  {
        timestamps: true
});

var Orders = mongoose.model('Order', orderSchema);

module.exports = Orders;

