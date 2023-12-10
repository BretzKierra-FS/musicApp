const express = require('express');
const router = express.Router();
const {
  login,
  callback,
  logout,
  refresh,
  search,
} = require('../controllers/authController');

//  Routes for auth /api/v1/auth
router.get('/', login);
router.get('/callback', callback);
router.get('/logout', logout);
router.get('/refresh', refresh);
router.get('/search', search);

module.exports = router;
