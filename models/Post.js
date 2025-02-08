//! Modelo de la publicación con los campos title, body y los timestamps.

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    body : {
        type: String,
        required : true
    }  
}, { timestamps: true });

const Post = mongoose.model('Posts', PostSchema);

module.exports = Post;