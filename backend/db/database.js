const mongoose = require("mongoose");

const connectToDB = async () => {
  const envUri = process.env.DB_URI;
  const localUri = "mongodb://127.0.0.1:27017/multivendor";

  const tryConnect = async (uri) => {
    const conn = await mongoose.connect(uri);
    console.log(`mongodb connected with server: ${conn.connection.host}`);
    return conn;
  };

  try {
    if (envUri) {
      try {
        return await tryConnect(envUri);
      } catch (err) {
        console.error("MongoDB connection to DB_URI failed:", err.message);
        console.warn("Falling back to local MongoDB at", localUri);
      }
    }

    // attempt local fallback
    return await tryConnect(localUri);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err;
  }
};

module.exports = connectToDB;
