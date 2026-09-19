const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);

    const collections = await connection.connection.db
      .listCollections({ name: "users" })
      .toArray();

    if (collections.length === 0) {
      await connection.connection.db.createCollection("users");
      console.log("Users collection created");
    }
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
