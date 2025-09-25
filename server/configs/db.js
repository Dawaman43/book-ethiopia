const { mongoose } = require("mongoose");

require("dotenv").config();

const createConnection = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = createConnection;
