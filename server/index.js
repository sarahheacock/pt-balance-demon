const express = require('express');

const path = require('path');
// const jsonParser = require("body-parser").json;
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const config = require('./configure/config');
const jwt = require('jsonwebtoken');

const Page = require("./models/page").Page;

const app = express();
const refreshRoutes = express.Router();
const adminAuthRoutes = express.Router();
const userRoutes = require("./routes/userRoutes"); //page retrieval for user
const adminRoutes = require("./routes/adminRoutes"); //routes that need admin auth
const fileRoutes = require("./routes/fileRoutes"); //routes that need admin auth

const PORT = process.env.PORT || 5000;

//======CONFIGURATION=========================================
mongoose.connect(config.database); //connect to database
app.set('superSecret', config.secret); //set secret constiable

// use body parser so we can get info from POST and/or URL parameters
// app.use(jsonParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));

const db = mongoose.connection;
db.on("error", function(err){
  console.error("connection error:", err);
});
db.once("open", function(){
  console.log("db connection successful");
});

//======ROUTES==============================================
//=========================================================
// Priority serve any static files.
refreshRoutes.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
//========================ADMIN LOGIN====================================
// POST /login
adminAuthRoutes.post('/login', function(req, res, next) {
  if (req.body.username && req.body.password) {
    Page.authenticate(req.body.username, req.body.password, function (error, user) {
      if (error || !user) {
        let err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }
      else {
        const token = jwt.sign(user._id, app.get('superSecret'), {
          expiresIn: '1h' //expires in one hour
        });

        res.json({
          admin: true,
          token: token
        });
      }
    });
  }
  else {
    let err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// route middleware to verify a token
adminAuthRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      else { // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});


//===============================================================
// All remaining requests return the React app, so it can handle routing.
refreshRoutes.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

//=================ROUTES=======================================

app.use('/user', userRoutes); //ROUTES THAT DO NOT NEED AUTHENTICATION

// apply the routes to our application with the prefix /admin
app.use("/admin", adminAuthRoutes);
app.use('/admin/edit', adminRoutes); // ROUTES THAT NEED ADMIN ATHENTICATION
app.use('/admin/file', fileRoutes); // ROUTES THAT NEED ADMIN ATHENTICATION

app.use(refreshRoutes);


//===========================================================
//==========================================================
//catch 404 and forward to error handler
app.use(function(req, res, next){
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error Handler
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});


//======START SERVER====================================================
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
