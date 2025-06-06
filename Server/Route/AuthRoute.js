const express = require('express');
const router = express.Router();

const { Signup, Login } = require('../Controller/Auth');

router.post('/register',Signup);
router.post('/login', Login);   

module.exports = router;
