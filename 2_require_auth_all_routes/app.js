// Here we call a middleware on all routes after `app.use(requireAuth)`
const express = require('express');
const app = express();
const port = 3000;

// route handler for all routes
const requireAuth = (req, res, next) => {
  if (req.user === undefined) {
    res.status('401').send('User is unauthenticated');
  } else {
    next();
  }
};

// This route is not affected by RequireAuth
app.get('/home', (req, res, next) => res.send('Welcome everyone'));

app.use(requireAuth);
// Routes below requireAuth

app.get('/me/account', (req, res, next) => {});

app.get('/me/settings', (req, res, next) => {});

app.listen(port, () => {
  console.log(`🌏 Server on http://localhost:${port}`);
});
