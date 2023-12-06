const axios = require('axios');
const querystring = require('querystring');
const { access } = require('fs');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
const utils = require('../utils/utils');

const stateKey = 'spotify_auth_state';
const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
const spotifyApiUrl = 'https://api.spotify.com/v1/search';

// Login Function
exports.login = (req, res) => {
  console.log(`Auth Start`);
  const state = utils.generateRandomString(10);
  res.cookie(stateKey, state);
  const authUrl = utils.generateSpotifyAuthUrl(CLIENT_ID, REDIRECT_URI, state);
  res.redirect(authUrl);
};

// Callback
exports.callback = async (req, res) => {
  const { code } = req.query;
  console.log('Received code:', code);
  //requesting tokens
  try {
    const response = await axios({
      method: 'POST',
      url: spotifyTokenUrl,
      data,
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      },
      headers: utils.generateAuthorizationHeader(CLIENT_ID, CLIENT_SECRET),
    });

    console.log('Spotify API response:', response.data);
    const { access_token, refresh_token, expires_in } = response.data; // new model
    return res
      .status(200)
      .json({ message: 'Callback handler', data: response.data });
  } catch (error) {
    return utils.handleError(res, error);
  }
};

// Logout
exports.logout = async (req, res) => {
  return res.status(200).json({ message: 'Logged Out' });
};

// Refresh
exports.refresh = async (req, res) => {
  const { refresh_token } = req.query;
  console.log('>>>>', refresh_token);
  try {
    const response = await axios({
      method: 'POST',
      url: spotifyTokenUrl,
      headers: generateAuthorizationHeader(),
      params: {
        grant_type: 'refresh_token',
        refresh_token,
      },
    });
    return res
      .status(200)
      .json({ message: 'Refresh Token', data: response.data });
  } catch (error) {
    return handleError(res, error);
  }
};

// Search
exports.search = async (req, res) => {
  try {
    const response = await axios({
      method: 'GET',
      url: spotifyApiUrl,
      params: {
        type: 'album,artist,track',
        q: req.query.q,
        limit: 5,
      },
      headers: {
        Authorization: 'Bearer ' + req.access_token,
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
};
