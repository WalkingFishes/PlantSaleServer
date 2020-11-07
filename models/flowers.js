const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var flowerSchema = new Schema({
    fname: {
        type: String,
        required: true,
    },
    fvariety: {
        type: String,
        required: true,
    },
    fcontainer: {
        type: String,
        required: true,
    },
    price: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Price'
    }
},  {
        timestamps: true
});

var Flowers = mongoose.model('Flower', flowerSchema);

module.exports = Flowers;

