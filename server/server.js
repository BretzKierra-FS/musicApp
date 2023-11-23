const express = require('express');
require('dotenv').config();
const connectDB = require('./app/db/config');
const cors = require('cors');
// const path = require('path');
const app = express();
const routeHandler = require('./app/routes/index');

app.use(express.urlencoded({ extended: true }));

connectDB();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Route Handler
app.use('/', routeHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
