const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const Joi = require('joi');
const validateBody = require('../middleware/validate');

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
});

router.get('/', categoryController.getCategories);
router.post('/', validateBody(categorySchema), categoryController.createCategory);

module.exports = router; 