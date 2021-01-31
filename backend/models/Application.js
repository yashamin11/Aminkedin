const mongoose = require('mongoose');

let Application = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    },
    recruiter :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sop: {
        type: String,
        required: true,
        default:''
    },

    status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Accepted', 'Rejected','Canceled'],
        default: ''
    },
    date_of_application:{
        type: Date,
        default: Date.now,
        required: false

    }

});

module.exports = mongoose.model('Application', Application);