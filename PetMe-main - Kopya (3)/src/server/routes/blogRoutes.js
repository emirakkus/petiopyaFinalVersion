const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllPosts);
router.post('/', blogController.createPost);
router.get('/:id', blogController.getPost);
router.patch('/:id', blogController.updatePost);
router.delete('/:id', blogController.deletePost);

module.exports = router;
