import paho.mqtt.client as mqtt
import time

#
# Global data dictionary and hash
#
data = {}
hash = None

#
# MQTT message handler
#
def on_message(client, user_data, message):

    # Print debug info
    print("message:",     str(message.payload.decode("utf-8")))
    print("topic:",       message.topic)
    print("qos:",         message.qos)
    print("retain flag:", message.retain)

    # See if hash in the message is different from the one we have


#
# Helpful log output helper
#
def on_log(client, user_data, log_level, buf):
    print("log: ", buf)

#
# Main
#
if __name__ == "__main__":

    # Setup the mqtt client
    client = mqtt.Client('python-client')
    client.connect('mqtt-server')
    client.on_message=on_message
    client.on_log=on_log
    client.subscribe("data/changes")
    client.loop_start()

    # Sleep indefinitely
    while True:
        print("hash:", hash)
        print("data:", data)
        time.sleep(1)
