const mongoose = require('mongoose');

let ApplicantProfile = new mongoose.Schema({

    name: {
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    },

    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    education:{
        type:String,
        default:''
    },
    skills:{
        type:String,
        default:''
    },
    image:{
		data: Buffer,
        type: String,
        default:''
    },
    resume:{
       data: Buffer,
        type : String,
        default: ''
    }


});

module.exports = mongoose.model('ApplicantProfile', ApplicantProfile);