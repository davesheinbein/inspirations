const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  content: String,
  createdby: {type: Schema.Types.ObjectId, ref: 'User'},
  rating: {
      type: Number, 
      min: 0, 
      max: 5, 
      default: 5
  }
}, {timestamps: true});

const videoSchema = new Schema({
    title: String,
    src: String,
    favorite: Boolean,
    comments: [commentsSchema],
}, {timestamps: true});


module.exports = mongoose.model('Video', videoSchema);