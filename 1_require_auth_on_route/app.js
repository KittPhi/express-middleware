// Here we call a middleware on specific routes is visted (using next).

const express = require('express');
const app = express();

// route handler
const requireAuth = (req, res, next) => {
  if (req.user === null) {
    res.status('401').send('User is unauthenticated');
  } else {
    next();
  }
};

app.get('/me/account', requireAuth, (req, res, next) => {
  res.send(req.user.account);
});

app.get('/me/settings', requireAuth, (req, res, next) => {
  res.send(req.user.settings);
});
