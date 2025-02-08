const Post = require('../models/Post');

    async function create(req, res) {
        try {
            if (!req.body.title || !req.body.body) { 
                return res.status(400).json({ error: "Title and body are required" }); 
            }

            const newPost = await Post.create(
                {title: req.body.title,
                body: req.body.body}
            );

            res.status(201).json(newPost);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "There was a problem creating the post" });
        }
    };

    async function getAll(req, res) {
        try {
            const posts = await Post.find()
            res.status(200).send(posts);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem getting all the Posts" });
        }
    };

    async function getById(req, res) { 
        try {
            const postId = await Post.findById(req.params._id)
            res.status(200).json(postId)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem getting the Post with that id" });
        }
    };

    async function getByTitle(req, res) { 
        try {
            const postId = await Post.findById(req.params.title)
            res.status(200).json(postId)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem getting the Post with the title" });
        }
    };

    async function updatePost(req, res) { 
        try { 
            const postId = await Post.findByIdAndUpdate(
                req.params._id, 
                {title: req.params.body},
                {body: req.params.body}, // objeto que queremos actualizar
                {new: true} // documento actualizado
            );

            if (!postId) {
                return res.status(404).json({ message: "Post not found" });
            };

            res.status(200).json(postId);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem updatting the Post status" });
        }
    };

    async function deletePost(req, res) { 
        try {
            const postId = await Post.findByIdAndDelete(req.params._id);

            if (!postId) {
                return res.status(404).json({ message: "Post not found" });
            };

            res.status(200).json('Deleted');
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem deleting the post" });
        }
    };

module.exports =  {create, getAll, getById, getByTitle, updatePost, deletePost};