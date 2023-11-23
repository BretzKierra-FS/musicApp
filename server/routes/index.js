const express = require('express');
const router = express.Router();

const authRouter = require('../routes/atuh');

//import routes here
//  Auth Router
router.use('/api/v1/auth', authRouter);
//  Spotify router

module.exports = router;
