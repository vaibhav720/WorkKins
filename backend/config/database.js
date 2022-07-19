const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Database Connected Successfully');
  }).catch((e) => {
    console.log(e);
  });
};

module.exports = connectToDb;
