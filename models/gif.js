const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String
    },
    rating: {
        type: Number, 
        min: 1, 
        max: 5, 
        default: 5
    }, 
    timestamps: true
});


const gifSchema = new Schema({
    // name: {

    // },
    reviews: {
      type: [reviewSchema]
    },

    googleId: {
      type: String // new
    }, 
    timestamps: true
});

module.exports = mongoose.model('Gif', studentSchema);