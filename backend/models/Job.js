const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
let Job = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,

    },
    maxapp: {
        type: Number,
        required: true
    },
    positions: {
        type: Number,
        required: true
    },

    no_app: {
        type: Number,
        default: 0
    },
    type:{
        type: String,
        required: true,
        default:'Full-Time'
    }, 
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    date_of_posting:{
        type: Date,
        required: false,
        default: Date.now,
        
    },
    deadline:{
        type: Date,
        required: true,
    },

    salary: {
        type: Number,
        default: true,
    },
    no_acc:{
       type: Number,
       default: 0
    },

    no_reviews:
    {
        type: Number,
        default: 0 
    },
    rating:
    {
        type: Number,
        default: 0
    },
    duration:{
        type: Number,
        default: 1,
        required: true
        
    },
    skillset:{
        type: String,
        required: true
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },

});
Job.plugin(mongoose_fuzzy_searching, { fields: ["title"] });
// const EventsSchema = mongoose.Schema(Product);
// EventsSchema.plugin(mongoose_fuzzy_searching, {fields: ['name']});
// const Events = mongoose.model('Events', EventsSchema);
// Events.fuzzySearch('Nodejs meetup').then(console.log).catch(console.error);

module.exports = mongoose.model('Job', Job);