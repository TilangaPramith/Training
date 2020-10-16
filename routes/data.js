const express = require('express');
const router = express.Router();

const { ipMiddleware } = require('../middleware/data');
const { viewData, viewDataGet } = require('../controllers/data');

router.post('/getData', ipMiddleware, viewData);

router.get('/getData', ipMiddleware, viewDataGet);


module.exports = router;