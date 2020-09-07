const express = require('express');
const router = express.Router();
const Post = require('../models/Post')


//відслідкування url 

// router.get('/edit', (req, res) => {
//     res.send('Edit posts')
// })
router.get('/posts', async (req, res) => {
    const { post } = req.query;
    let posts;
    try {
        // check if object query is not empty
        if (!(Object.entries(req.query).length === 0 && req.query.constructor === Object)) {
            posts = await Post.find({ post: { $in: post.split(',') } });
        } else {
            posts = await Post.find();
        }

        if (!posts || posts.length === 0) {
            throw { message: 'Post is not found' };
        }
        res.status(200).send(posts);

    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send('Post does not exist!');
        }
        res.status(200).send(post);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/posts', async (req, res) => {
    const { title, body, image, checked } = req.body;
    try {
        const newPost = new Post({
            title,
            body,
            image,
            checked
        });
        await newPost.save();
        res.status(200).send(newPost);

    } catch (err) {
        res.status(500).send(err);
    }
})

router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Post.findByIdAndDelete({ _id: id });
        res.send(response);

        if (!response) {
            return res.status(404).send('Post does not exist!');
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

router.patch('/posts/update/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(updatedPost)
        if (!updatedPost) {
            return res.status(404).send('Post does not update!');
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router;