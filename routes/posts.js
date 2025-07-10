const express = require('express')
const router = express.Router()
const posts = require('../data/posts')
const { error, log } = require('console')
const postController = require('../controllers/postsController');



// index
router.get('/', postController.index);

// show
router.get('/:id', postController.show);


// delete
router.delete('/:id', postController.destroy);

// store
router.post('/', postController.store);

// update
router.patch('/:id', postController.update);




module.exports = router;
