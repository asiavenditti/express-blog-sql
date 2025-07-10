const posts = require('../data/posts');

// index
const index = (req, res) => {
    let filteredPost = posts;

    if (req.query.tag) {
        filteredPost = posts.filter(post =>
            post.tags.includes(req.query.tag)
        );
    }

    res.json(filteredPost);
};

// show
const show = (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.find(p => p.id === id)

    if (!post) {
        return res.status(404).json({
            error: "Not Found",
            message: "Post non trovato"
        });
    }

    res.json(post)
};

// delete
const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id)

    if (!post) {
        return res.status(404).json({
            message: `Post non trovato`
        })
    }

    posts.splice(posts.indexOf(post), 1);
    res.sendStatus(204);
};

// store
const store = (req, res) => {
    const newId = posts[posts.length - 1].id + 1

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    posts.push(newPost);
    res.status(201).json(newPost);
};

// update
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({
            error: 'Not Found',
            message: 'Post non trovato'
        })
    }

    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    res.json(post);
}



module.exports = {
    index,
    show,
    destroy,
    store,
    update
}
