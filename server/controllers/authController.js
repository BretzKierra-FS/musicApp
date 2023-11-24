const axios = require('axios');
const querystring = require('querystring');

const { Client_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

//  Login Fuction
exports.login = (req, res) => {
  console.log(`Auth Start`);
  res.redirect(`https://accounts.spotify.com/authorize`);
};

// Callback Function
exports.callback = async (req, res) => {
  const { code } = req.query;
  console.log('>>>', code);
  return res.status(200).json({ message: 'callback handler' });
};

// Logout Function
exports.logout = async (req, res) => {
  return res.status(200).json({ message: 'Loged Out' });
};

//  Refresh Function
exports.refresh = async (req, res) => {
  const { refresh_token } = res.query;
  console.log('>>>>', refresh_token);
  return res.status(200).json({ message: 'Refresh Token' });
};
