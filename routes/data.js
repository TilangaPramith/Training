const express = require('express');

const router = express.Router();

const { ipMiddleware } = require('../middleware/data');
const { registerUser, authenticateUser } = require('../controllers/data');

router.post('/registerUser', ipMiddleware, registerUser);

router.get('/registerUser', ipMiddleware, registerUser);

router.post('/authenticationUser', authenticateUser);

module.exports = router;
