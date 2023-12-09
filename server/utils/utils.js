const querystring = require('querystring');

//generate random string

function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

//spotify URL
const generateSpotifyAuthUrl = (clientId, redirectUri, state) => {
  const scope = 'user-read-private user-read-email';
  return `https://accounts.spotify.com/authorize?${querystring.stringify({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope,
    state,
  })}`;
};

//HeaderAuth
const generateAuthorizationHeader = (clientId, clientSecret) => {
  return {
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64'
    )}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
};

//errorHandlers
const handleError = (res, error) => {
  console.error('Error:', error.message);
  if (error.response) {
    console.error('Error details:', error.response.data);
    return res
      .status(error.response.status)
      .json({ error: 'API Error', details: error.response.data });
  } else {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  generateRandomString,
  generateSpotifyAuthUrl,
  generateAuthorizationHeader,
  handleError,
};
