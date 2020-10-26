const express = require('express');

const router = express.Router();

const { ipMiddleware, isValidToken } = require('../middleware/data');
const { registerUser, authenticateUser, getUser } = require('../controllers/data');

router.post('/registerUser', ipMiddleware, registerUser);

router.get('/registerUser', ipMiddleware, registerUser);

router.post('/authenticationUser', authenticateUser);

router.get('/getUser', isValidToken, getUser);
// isValidToken

module.exports = router;
