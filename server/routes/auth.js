const express = require('express');
const router = express.Router();
const tokenRefresh = require('../middleware/spotifyMiddleware');
const {
  login,
  callback,
  logout,
  search,
} = require('../controllers/authController');

//  Routes for auth /api/v1/auth
router.get('/', login);
router.get('/callback', callback);
router.get('/logout', logout);
router.get('/search', tokenRefresh, search);

module.exports = router;
