const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userTokenVerify = require('../middleware/user');


//відслідкування url

// posts
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

//user
router.post('/auth', async (req, res) => {
    const { name } = req.body;
    const hash = await bcrypt.hash(req.body.password, 10);
    try {
        const checkedUser = await User.findOne({ name })
        if (checkedUser) {
            return res.json({
                message: 'user already exist',
                errorNumber: '403'
            })
        }
        const newUser = new User({
            name: req.body.name,
            password: hash,
        });
        console.log(req.body)
        await newUser.save();
        res.status(200).send(newUser);
    } catch (err) {
        res.status(500).send(err)
    }

})

router.get('/auth', async (req, res) => {
    const { user } = req.query;
    let users;
    try {
        // check if object query is not empty
        if (!(Object.entries(req.query).length === 0 && req.query.constructor === Object)) {
            users = await User.find({ user: { $in: user.split(',') } });
        } else {
            users = await User.find();
        }

        if (!users || users.length === 0) {
            throw { message: 'User is not found' };
        }
        res.status(200).send(users);

    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const { name } = req.body;
    try {
        const user = await User.findOne({ name })
        if (!user) {
            // return res.status(401).json({
            return res.json({
                message: 'Auth failed'
            })
        }
        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) {
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        const token = jwt.sign({ name: user.name, userId: user._id }, 'secret_this_should_be_longer', { expiresIn: "1h" });
        res.status(200).json({
            token: token,
            id: user._id
        })
    } catch (err) {
        res.status(400).send(err);
    }
})
router.get('/auth/:id', userTokenVerify, async (req, res) => {
    console.log(req.param)
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('User does not exist!');
        }
        res.status(200).send(user);
        console.log(user)
    } catch (err) {
        res.status(400).send(err);
    }
})
router.delete('/auth/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await User.findByIdAndDelete({ _id: id });
        res.send(response);

        if (!response) {
            return res.status(404).send('User does not exist!');
        }
    } catch (err) {
        res.status(400).send(err);
    }
})


module.exports = router;