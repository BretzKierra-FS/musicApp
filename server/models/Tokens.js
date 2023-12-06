const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  access_token: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  expires_in: {
    type: Number,
    required: true,
  },
});
