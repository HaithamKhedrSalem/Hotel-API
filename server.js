'use strict';

const express = require('express');
const request = require('express');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
require('./app/hotels')(app, {});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);