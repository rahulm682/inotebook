const mongoose = require('mongoose');
// import schema from mongoose to make new Schems
// import { Schema } from 'mongoose';
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // used like foreign key that refers to user schema that have been exported
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('note', NoteSchema);