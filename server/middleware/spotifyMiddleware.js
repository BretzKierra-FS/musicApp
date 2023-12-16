const Token = require('../models/Tokens');
const { refreshAccessToken } = require('../controllers/authController');

const tokenRefresh = async (req, res, next) => {
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

        // refresh access token for the API request
        req.access_token = refreshResponse.access_token;
      } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(401).json({ message: 'Token refresh failed' });
      }
    } else {
      req.access_token = token.access_token;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = tokenRefresh;
