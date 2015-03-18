var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema ({
    author: String,
    comment: String
});

//query model to retrieve search results
module.exports = mongoose.model('Comment', CommentSchema);