import paho.mqtt.client as mqtt

#
# MQTT message handler
#
def on_message(client, user_data, message):
    print("message:",     str(message.payload.decode("utf-8")))
    print("topic:",       message.topic)
    print("qos:",         message.qos)
    print("retain flag:", message.retain)

#
# Helpful log output helper
#
def on_log(client, user_data, log_level, buf):
    print("log: ", buf)

#
# Main
#
if __name__ == "__main__":
    client = mqtt.Client('python-client')
    client.connect('mqtt-server')
    client.on_message=on_message
    client.on_log=on_log
    client.loop_start()
