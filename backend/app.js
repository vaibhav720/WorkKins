const express = require('express');
const errorMiddleware = require('./middleware/error');
const adminRouter = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const clientRouter = require('./routes/clientRoutes');
const cors = require('cors');

const app = express();

// using cors
app.use(cors());

// for parsing json from request
app.use(express.json());

// for parsing the cookies in request
app.use(cookieParser());

// for parsing the body
app.use(bodyParser.urlencoded({
  extended: true
}));

// routes using
app.use('/api/admin', adminRouter);
app.use('/api/client', clientRouter);

// for using error middleware
app.use(errorMiddleware);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = app;