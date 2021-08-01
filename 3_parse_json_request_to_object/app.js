// Here we created a JSONParser middleware that parses JSON request body into an object,
// and sets the object as req.body.
// Later, the object is read from route /new/post and any other routes defined after.
const express = require('express');
const app = express();
const port = 3000;

// Converts request body into req.body as a javascript object
function JSONParser(req, res, next) {
  if (req.headers['content-type'].startsWith('application/json')) {
    const rawBody = readStreamIntoString(req);
    req.body = JSON.parse(rawBody);
  }
  next();
}

// Apply JSONParser middleware to all routes defined after this line
app.use(JSONParser);

// Reads post name and content from req.body
app.get('/new/post', (req, res, next) => {
  const postTitle = req.body.title;
  const postContent = req.body.content;
  // more stuff
});

// Reads username from req.body
app.get('/new/user', (req, res, next) => {
  const userName = req.body.username;
  // more stuff
});

app.listen(port, () => {
  console.log(`🌏 Server on http://localhost:${port}`);
});
