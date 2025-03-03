const express = require('express');
const ProductController = require('../app/controllers/ProductController');
const router = express.Router();

router.get('/', ProductController.index);
module.exports = router;
