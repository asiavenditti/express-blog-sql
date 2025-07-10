const posts = require('../data/posts');
const connection = require('../db/connection');

// index

const index = (req, res) => {

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        console.log(results);

        res.json(results)

    })

}

// show

const show = (req, res) => {
    const id = parseInt(req.params.id);

    const sql = 'SELECT * FROM blog_db.posts WHERE id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message });

        if (!results.length > 0) {
            return res.status(404).json({
                error: true,
                message: 'Post non trovato'
            });
        }

        return res.json(results[0]);
    })
}


// delete

const destroy = (req, res) => {
    const id = parseInt(req.params.id);

    const sql = "DELETE FROM blog_db.posts WHERE id = ?";

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message });

        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: true,
                message: 'Post non trovato'
            });
        }

        res.sendStatus(204);
    });
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
