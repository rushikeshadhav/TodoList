const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

exports.connectToDb = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(`Connected to DB:${conn.connection.name}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
