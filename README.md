# What is this
This is a tutorial project about how to use MQTT pub/sub instead of API polling. To read the background and a better explanation of this repository and code, please checkout the medium.com post [here](https://naveed125.medium.com/an-alternative-strategy-to-api-polling-using-pub-sub-and-mqtt-40dc643dcf82).
Some basic information is included below in case you're not inclined to clicking random links. 

# How does it work
The basic idea is that the web server maintains a data set and clients get notified when that data changes.

## Project components
This project has four components that you need to be aware of. They are all tied together using the [docker-compose.yml](https://github.com/naveed125/mqtt-api-pub-sub/blob/main/docker-compose.yml) file so do check that out.
* An [Eclipse Mosquitto](https://mosquitto.org/) MQTT Server.
* A NodeJS/Express based HTTP Server.
* A Python CLI Client Application
* A PHP CLI Client Application

## Starting up
To bring everything up simple run the following command. I am assuming docker is installed for your environment.
```
% docker-compose up -d --force-recreate
```

## Lets see it in action
Using the terminal window send a post request to update the data as shown below.
```
% curl -i --request PUT \
    --url http://localhost/key/well/value/awesome 

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 58
ETag: W/"3a-0YYHz7BdB/buYbAnWMOlZMuk0U8"
Date: Mon, 25 Jan 2021 03:57:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":true,"hash":"1df177e307841896b272b48366d18659"}

```
Watch to the docker-compose log to see how the clients react to data changes.

```
node-server_1    | Sending data change event to MQTT topic data/hash with new hash 1df177e307841896b272b48366d18659

python-client_1  | Log:  Received PUBLISH (d0, q0, r0, m0), 'data/hash', ...  (32 bytes)
python-client_1  | Updating data based on new hash 1df177e307841896b272b48366d18659 ...
python-client_1  | Current hash 1df177e307841896b272b48366d18659
python-client_1  | Current data {'well': 'awesome'}

php-client_1     | Received message on topic [data/hash]: 1df177e307841896b272b48366d18659
php-client_1     | Updating data using http://node-server/data based on new hash: 1df177e307841896b272b48366d18659 ...
php-client_1     | Current hash: 1df177e307841896b272b48366d18659
php-client_1     | Current data: {"well":"awesome"}
```

# I have an issue or question
If you are running into an issue, or you have a suggestion or question about this project -- well good luck to you, just-kidding. Open an issue using [Issues](https://github.com/naveed125/mqtt-api-pub-sub/issues) page.

# I want to contribute
Well, Awesome! 

I would love to see more clients added to this project, write one for [Haskell](https://www.haskell.org/) if someone did not already beat you to it, or use another language and send me a PR. Bug fixes and enhancements are welcome too.

Cheers
