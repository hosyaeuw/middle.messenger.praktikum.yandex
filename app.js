const express = require('express');
const path = require('path');

const app = express();
const defaultPort = 3000;
const PORT = process.env.PORT || defaultPort;

app.use(express.static(path.join(__dirname, "dist")));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));