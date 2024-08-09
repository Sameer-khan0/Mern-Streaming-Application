const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectedInstance = await mongoose.connect(
      "mongodb://127.0.0.1:27017/social_stream"
    );
    console.log(
      `\nMondodb connected !! DB Host: ${connectedInstance.connection.host}`
    );
  } catch (err) {
    console.log("Mondogb connection failled: ", err);
  }
};

module.exports = connectDB;
