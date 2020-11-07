const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    lastname: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    privilege: {
        type: String,
        required: true
    },
},  {
        timestamps: true
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;

