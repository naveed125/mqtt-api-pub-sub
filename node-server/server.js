'use strict';

const express = require('express');
const mqtt = require('mqtt');
const md5 = require('md5');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';
const TOPIC = 'data/hash';

// Data
let data = {};

// Helper hash function
function hash() {
    return md5(JSON.stringify(data))
}

// Globals inits
let app = express();
    app.use(express.json());
let client  = mqtt.connect('mqtt://mqtt-server');

// Default route
app.get('/', (req, res) => {
    res.send({
        "success": true
    });
});

// Get the data
app.get('/data', (req, res) => {
    res.send({
        "success": true,
        "data": data,
        "hash": hash()
    });
});

// Update the data
app.put('/key/:key/value/:value', (req, res) => {

    if (req.params.key in data && data[req.params.key] === req.params.value){
        return res.send({
            "success": false,
            "message": "No changes",
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
    console.log("Sending hash", hash(), "to topic", TOPIC);
    client.publish(TOPIC, hash());
});
