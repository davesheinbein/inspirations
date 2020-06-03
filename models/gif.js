const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentsSchema = new Schema({
    content: {
        type: String
    },
    createdby: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {
        type: Number, 
        min: 0, 
        max: 5, 
        default: 5
    }
}, {timestamps: true});


const gifSchema = new Schema({
    title: String,
    src: String,
    // favorite: {
    //     type: Boolean,
    //     default: false
    // },
    comments: [commentsSchema],
}, {timestamps: true});

module.exports = mongoose.model('Gif', gifSchema);