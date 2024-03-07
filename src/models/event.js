const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const eventSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date : {
        type: Date,
        required: true
    },
    assignee : {
        type: String,
        required: true
    },
    creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
    }
});

module.exports =  mongoose.model('Event', eventSchema);