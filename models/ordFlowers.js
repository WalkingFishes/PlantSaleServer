const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ordFlowerSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    flower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flower'
    },
    qty: {
        type: Number,
        required: true,
        min: 0
    }
},  {
        timestamps: true
});

var OrdFlowers = mongoose.model('OrdFlower', ordFlowerSchema);

module.exports = OrdFlowers;

