const mongoose = require('mongoose');

let RecruiterProfile = new mongoose.Schema({

    name: {
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    },

    contact:{
        type: String,
        required: false
    },

    bio: {
        type: String,
        required: false
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

});

module.exports = mongoose.model('RecruiterProfile', RecruiterProfile);