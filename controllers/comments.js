const Gif = require('../models/gif');
const Video = require('../models/video');
const comment= require('../models/user')

module.exports = {
    createGifComment,
    // deleteGifComment
};



function createGifComment(req, res) {
    req.body.createdby = req.user._id
    Gif.findById(req.params.id, function(err, gif){
        gif.comments.push(req.body); // Add t he comment to the comments array
        gif.save(function(err, gif){
            res.redirect(`/gifs`);
        });
    });
}


// // new
// function deleteGifComment(req, res) {
//     Gif.findOne({'comments._id': req.params.id}, function(err, gif) {
//         // The embedding lesson has this in the further study section
//         // Find the comment subdoc
//         const comment = gif.comments.id(req.params.id);
//         // Remove the comment subdoc from the array
//         comment.remove();
//         // Save the gif doc
//         gif.save(function(err) {
//           // Redirect back to show page of gif
//         res.redirect(`/gifs/${gif._id}`);
//         });
//     });
// }
// ^^^^^^
