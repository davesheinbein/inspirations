const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    content: {
        type: String
    },
    createdby: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {
        type: Number, 
        min: 1, 
        max: 5, 
        default: 5
    }
}, {timestamps: true});

const gifSchema = new Schema({
    title: String,
    src: String,
    // favorite: Boolean,
    comments: [commentsSchema],
}, {timestamps: true});

const videoSchema = new Schema({
    title: String,
    src: String,
    // favorite: { // might delete)
    //     type: Boolean
    // },
    comments: [commentsSchema],
}, {timestamps: true});

module.exports = mongoose.model('Gif', gifSchema, 'Video', videoSchema);