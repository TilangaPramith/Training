const express = require('express');
const router = express.Router();

const { ipMiddleware } = require('../middleware/data');
const { viewData } = require('../controllers/data');

router.post('/getData', ipMiddleware, viewData);


module.exports = router;