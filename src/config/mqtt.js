import mqtt from "mqtt";

export const MqttTopicEnum = {
  DeviceToggle: "device",
  DeviceStatus: "device-status",
  DataSensor: "data-sensor",
};

const mqttOptions = {
  host: "localhost",
  port: 1234,
  username: "tuan",
  password: "123456",
};

let client;

export const mqttHandler = {
  connect: () => {
    client = mqtt.connect(mqttOptions);
    client.on("connect", () => {
      console.log("Đã kết nối thành công với MQTT Broker!");
    });
    client.on("error", (err) => {
      console.error("Kết nối thất bại:", err.message);
    });
  },
  subscribe: (topic) => {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error("Đăng ký chủ đề thất bại:", topic, err.message);
      } else {
        console.log("Đăng ký chủ đề thành công!", topic);
      }
    });
  },
  publish: (topic, message) => {
    client.publish(topic, message, (err) => {
      if (err) {
        console.error("❌ Gửi tin nhắn thất bại:", topic, err.message);
      } else {
        console.log("✅ Gửi tin nhắn thành công!", topic, message);
      }
    });
  },
  listenToTopic: (topic, callback) => {
    client.on("message", (receivedTopic, message) => {
      if (receivedTopic === topic) {
        callback(message.toString());
      }
    });
  },
  disconnect: () => {
    client.end(() => {
      console.log("✅ Đã ngắt kết nối khỏi MQTT Broker!");
    });
  },
};
