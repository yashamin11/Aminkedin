const mongoose = require('mongoose');

let User = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    type:{
        type: String,
        enum: ['A', 'R'],
        default: 'A'
    },

    password:{
        type: String,
        required: true,
        minlength: 3
    },

    no_reviews: {
        type: Number,
        default: 0
    }, 
   
    rating: {
        type: Number,
        default : 0
    },

    hasRated:{
        type:  Boolean,
        defult: false

    },
    hasbeenRated:{
        type:  Boolean,
        default: false

    },
    no_app:{
        type: Number,
        default: 0
    },
    email:{
        type:String,
        default:''
    },
    hasbeenAccepted:{
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('User', User);