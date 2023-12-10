const axios = require('axios');
const querystring = require('querystring');
const { access } = require('fs');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
const Token = require('../models/Tokens');
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

//callback
exports.callback = async (req, res) => {
  const { code, state } = req.query;
  console.log('Received code:', code);

  // Check if the state matches what was sent during the authentication request
  const storedState = req.cookies[stateKey];
  if (state === null || state !== storedState) {
    return res.status(500).json({ error: 'State mismatch' });
  }

  // Clear the stored state
  res.clearCookie(stateKey);

  try {
    const response = await axios({
      method: 'POST',
      url: spotifyTokenUrl,
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
      headers: utils.generateAuthorizationHeader(CLIENT_ID, CLIENT_SECRET),
    });

    console.log('Spotify API response:', response.data);

    const { access_token, refresh_token, expires_in } = response.data;

    // Create a new Token
    const tokenInstance = new Token({
      access_token,
      refresh_token,
      expires_in: Date.now() + expires_in * 1000,
    });

    // Save the token to the database
    const savedToken = await tokenInstance.save();

    // Redirect to localhost:3000 with the access token as a query parameter
    return res.redirect(`http://localhost:3000/?access_token=${access_token}`);
  } catch (error) {
    return utils.handleError(res, error);
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const { authorization } = req.headers;

    // Extract the token from Auth header
    const accessToken = authorization.split(' ')[1];

    // delete the current token and all tokens that have expired
    await Token.deleteMany({
      $or: [{ access_token: accessToken }, { expires_in: { $lt: Date.now() } }],
    });

    return res.status(200).json({ message: 'Logged Out' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Refresh
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios({
      method: 'POST',
      url: spotifyTokenUrl,
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      headers: utils.generateAuthorizationHeader(CLIENT_ID, CLIENT_SECRET),
    });

    // Store the new expiration timestamp in the database
    const updatedToken = await Token.findOneAndUpdate(
      { refresh_token: refreshToken },
      {
        access_token: response.data.access_token,
        expires_in: Date.now() + response.data.expires_in * 1000,
      },
      { new: true }
    );

    return updatedToken;
  } catch (error) {
    throw error;
  }
};

// Search
exports.search = async (req, res) => {
  try {
    const token = await Token.findOne();

    // check if token is expired
    if (token.expires_in < Date.now()) {
      // Token is expired, refresh it
      try {
        const refreshResponse = await refreshAccessToken(token.refresh_token);
        // Update the database with the new token
        await Token.findOneAndUpdate(
          { refresh_token: token.refresh_token },
          {
            access_token: refreshResponse.access_token,
            expires_in: Date.now() + refreshResponse.expires_in * 1000,
          },
          { new: true }
        );

        //refresh access token for the API request
        req.access_token = refreshResponse.access_token;
      } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(401).json({ message: 'Token refresh failed' });
      }
    } else {
      req.access_token = token.access_token;
    }

    // Make API request
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
