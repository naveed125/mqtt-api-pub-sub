<?php

require __DIR__ . '/vendor/autoload.php';

use \PhpMqtt\Client\MqttClient;
use \GuzzleHttp\Client as GuzzleHttpClient;
/**
 * Constants
 */
$server   = 'mqtt-server';
$port     = 1883;
$clientId = 'php-client';
$topic = "data/hash";
$api_url = "http://node-server/data";

/**
 * Global data
 */
$data = [];
$hash = "";

/**
 * Init the mqtt client and
 */
$mqtt = new MqttClient($server, $port, $clientId);
$mqtt->connect();
$mqtt->subscribe(
    $topic,
    function ($topic, $message) use (&$data, &$hash, $api_url) {
        printf("Received message on topic [{$topic}]: {$message}\n");
        if ($message !== $hash) {
            print("Updating data using {$api_url} based on new hash: {$message} ...\n");
            try {
                $http = new GuzzleHttpClient();
                $res = $http->request('GET', $api_url);
                if ($res->getStatusCode() == 200) {
                    $data = json_decode($res->getBody())->data;
                    $hash = $message;
                } else {
                    print("FAILED TO GET DATA\n");
                }
            }
            catch (\Exception $e) {
                print("ERROR DURING HTTP: {$e->getMessage()}\n");
            }
        }
        else {
            print("Skipping changes because message {$message} matches the current hash {$hash}\n");
        }

        print("Current hash: {$hash}\n");
        print("Current data: " . json_encode($data) . "\n");
    },
    0);
$mqtt->loop(true);
