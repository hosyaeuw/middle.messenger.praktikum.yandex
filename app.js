const express = require('express');
const path = require('path');

const app = express();
const defaultPort = 3000;
const PORT = process.env.PORT || defaultPort;

const staticFolder = path.join(__dirname, "dist")

app.use(express.static(staticFolder));

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(staticFolder, "./index.html"));
});

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));