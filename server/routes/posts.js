const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const Joi = require('joi');
const validateBody = require('../middleware/validate');
const auth = require('../middleware/auth');

const postSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  content: Joi.string().min(5).required(),
  category: Joi.string().required()
});

// Public routes (no authentication required)
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);

// Protected routes (authentication required)
router.post('/', auth, validateBody(postSchema), postController.createPost);
router.put('/:id', auth, validateBody(postSchema), postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router; 