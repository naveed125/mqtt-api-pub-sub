'use strict';

const express = require('express');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();

// Default route
app.get('/', (req, res) => {
    res.send("OK\n");
});

// Get the data
app.get('/data', (req, res) => {
    res.send("DATA\n");
});

// Update the data
app.post('/data', (req, res) => {
    res.send("DATA UPDATED\n");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
