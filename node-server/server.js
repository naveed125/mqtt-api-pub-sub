'use strict';

const express = require('express');
const crypto = require('crypto');
const mqtt = require('mqtt');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';
const TOPIC = 'data/hash';

// Data
let data = {};
let hash = function () {
    return crypto.createHash('md5').update(data.toString()).digest("hex");
};

// Globals inits
let app = express();
    app.use(express.json());
let client  = mqtt.connect('mqtt://mqtt-server');

// Default route
app.get('/', (req, res) => {
    res.send({
        "success": true,
    });
});

// Get the data
app.get('/data', (req, res) => {
    res.send({
        "success": true,
        "data": data
    });
});

// Update the data
app.put('/key/:key/value/:value', (req, res) => {

    if (req.params.key in data && data[req.params.key] === req.params.value){
        return res.send({
            "success": false,
            "hash": hash()
        });
    }

    data[req.params.key] = req.params.value;

    console.log("Sending data change event to MQTT topic", TOPIC, "with new hash", hash());
    client.publish(TOPIC, hash());

    res.send({
        "success": true,
        "hash": hash()
    });
});

// Start the HTTP listener
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Start the MQTT connection and post the initial data hash to it
client.on('connect', function () {
    let newHash = hash();
    console.log("Sending hash", newHash, "to topic", TOPIC);
    client.publish(TOPIC, newHash);
});
