// Just like `bodyParser` where it parses request bodies
// Here we have a 'factory' function to return middleware functions.
// A function for functions 🤖

// Below we allow passing in an options param to control which middleware
// function to return.
const express = require('express');
const app = express();
const port = 3000;

function BodyParser(options) {
  if (options.type === 'JSON') {
    return (req, res, next) => {
      if (req.headers['content-type'].startsWith('application/json')) {
        const rawBody = readStreamIntoString(req);
        req.body = JSON.parse(rawBody);
      }
      next();
    };
  } else if (options.type === 'URL_ENCODED') {
    return (req, res, next) => {
      if (
        req.headers['content-type'].startsWith(
          'application/x-www-form-urlencoded'
        )
      ) {
        const rawBody = readStreamIntoString(req);
        req.body = new URLSearchParams(rawBody);
      }
      next();
    };
  }
}

app.use(BodyParser({ type: 'JSON' }));
app.use(BodyParser({ type: 'URL_ENCODED' }));

app.listen(port, () => {
  console.log(`🌏 Server on http://localhost:${port}`);
});
