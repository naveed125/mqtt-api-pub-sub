# What is this
This is a tutorial project about how to use MQTT pub/sub instead of API polling for fun and profit. To see a full explanation of this repository and code, please checkout my post [here](https://medium.com/@naveed125).
Some basic information is included below in case you're not inclined to clicking links. But I really do recommend reading the linked article.

# How does it work
The basic idea is that the web server maintains a data set and clients get notified when that data changes.

## Project components
This project has four components that you need to be aware of. They are all tied together using the docker-compose.yml file so do check that out.
* An [Eclipse Mosquitto](https://mosquitto.org/) MQTT Server.
* A NodeJS/Express based HTTP Server.
* A Python CLI Client Application
* A PHP CLI Client Application

## Starting up
To bring everything up just run the following command. I am assuming docker is installed for your environment.
```
% docker-compose up -d --force-recreate

```

## See it in action
Using the terminal window to send a post request to the web server as shown below.
```
% curl -i --request PUT \
    --url http://localhost/key/well/value/awesome \
    --header 'Content-Type: application/json'

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 58
ETag: W/"3a-0YYHz7BdB/buYbAnWMOlZMuk0U8"
Date: Mon, 25 Jan 2021 03:57:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":true,"hash":"1441a7909c087dbbe7ce59881b9df8b9"}

```
Watch to the docker-compose log to see how the clients react to data changes.

# I have an issue or question
If you are running into an issue, or you have a suggestion or question about this project -- well good luck to you, just-kidding. Open an issue using [Issues](https://github.com/naveed125/mqtt-api-pub-sub/issues) page.

# I want to contribute
Well, Awesome! 

I would like to see more clients added to this project, write one for [Haskell](https://www.haskell.org/) if someone did not already beat you to it, or use another language and send me a PR. Bug fixes and enhancements are welcome too.

Cheers
