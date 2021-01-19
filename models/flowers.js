const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var flowerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    variety: {
        type: [String],
        required: true,
    },
    container: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: ''
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

