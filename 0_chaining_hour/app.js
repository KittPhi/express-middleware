// Here we are chaining two middleware functions to handle /hello route.
// We use next() to pass control from the first middleware to the second.

const express = require('express');
const app = express();

var hour = new Date().getHours();
const isDayTime = hour > 6 && hour < 20;

app.get(
  '/',
  // middleware #1
  (req, res, next) => {
    if (isDayTime) {
      res.send('morning');
    } else {
      next();
    }
  },
  // middleware #2: called when isDayTime() === false
  (req, res, next) => {
    res.send('afternoon');
  }
);

app.listen(3000, function () {
  console.log('🌏 Server listening on port:', 3000);
});
