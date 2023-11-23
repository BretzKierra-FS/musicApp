const mongoose = require('mongoose');

const connectDb = async () => {
  //wrapped into a try catch if connection fails
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    //shuts down server
    process.exit(1);
  }
};

module.exports = connectDb;
