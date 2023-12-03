const axios = require('axios');
const querystring = require('querystring');
const generateRandomString = require('../utils/utils');
const { access } = require('fs');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

//  Login Fuction
exports.login = (req, res) => {
  console.log(`Auth Start`);
  const stateKey = 'spotify_auth_state';
  const state = generateRandomString(10);
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email';

  res.redirect(
    `https://accounts.spotify.com/authorize?` +
      querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        scope: scope,
        state: state,
      })
  );
};

// Callback Function
exports.callback = async (req, res) => {
  const { code } = req.query;
  console.log('Received code:', code);

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Spotify API response:', response.data);
    const { access_token, refresh_token, expires_in } = response.data;
    return res
      .status(200)
      .json({ message: 'Callback handler', data: response.data });
  } catch (error) {
    console.error('Error in Spotify API request:', error.message);
    if (error.response) {
      console.error('Spotify API error details:', error.response.data);
      return res
        .status(error.response.status)
        .json({ error: 'Spotify API Error', details: error.response.data });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
// Logout Function
exports.logout = async (req, res) => {
  return res.status(200).json({ message: 'Loged Out' });
};
// Refresh Function
exports.refresh = async (req, res) => {
  const { refresh_token } = req.query;
  console.log('>>>>', refresh_token);
  const response = await axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
  });
  return res
    .status(200)
    .json({ message: 'Refresh Token', data: response.data });
};
