import paho.mqtt.client as mqtt
import requests
import time

#
# Constants
#
MQTT_TOPIC = 'data/hash'
MQTT_SERVER = 'mqtt-server'
API_URL = 'http://node-server/data'

#
# Global data dictionary and hash
#
data = {}
hash = ""

#
# MQTT message handler
#
def on_message(client, user_data, message):

    global data, hash

    # Print debug info
    payload =  str(message.payload.decode("utf-8"))
    print("Payload:",     payload)
    print("Topic:",       message.topic)
    print("QOS:",         message.qos)
    print("Retain flag:", message.retain)

    # See if hash in the message is different from the one we have
    if payload != hash:
        print("Updating data based on new hash", payload, "...")
        req = requests.get(API_URL)
        if req.status_code == 200:
            data = req.json()["data"]
            hash = payload
    else:
        print("Skipping changes because payload", payload, "matches the current hash", hash)

    print("Current hash", hash)
    print("Current data", data)


#
# Helpful log output helper
#
def on_log(client, user_data, log_level, buf):
    print("Log: ", buf)


#
# Main
#
if __name__ == "__main__":

    # Setup the mqtt client
    print("Setting up mqtt client for topic", MQTT_TOPIC, "...")
    client = mqtt.Client('python-client')
    client.connect(MQTT_SERVER)
    client.on_message=on_message
    client.on_log=on_log
    client.subscribe(MQTT_TOPIC)
    client.loop_start()

    # Sleep indefinitely - waiting for mqtt messages to arrive
    while True:
        time.sleep(1)
