const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customerSchema = new Schema({
    lastname: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    telno: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    }
},  {
        timestamps: true
});

var Customers = mongoose.model('Customer', customerSchema);

module.exports = Customers;
