import mqtt from 'mqtt';
import { sensorModel } from '../models/sensor.model.js';

export const MqttTopicEnum = {
  DeviceToggle: 'device-toggle',
  DataSensor: 'data-sensor',
};

const mqttOptions = {
  host: 'localhost',
  port: 1234,
  username: 'tuan',
  password: '123456',
};

let client;

export const mqttHandler = {
  connect: () => {
    client = mqtt.connect(mqttOptions);
    client.on('connect', () => {
      console.log('Đã kết nối thành công với MQTT Broker!');
    });
    client.on('error', (err) => {
      console.error('Kết nối thất bại:', err.message);
    });
  },
  subscribe: (topic) => {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('Đăng ký chủ đề thất bại:', topic, err.message);
      } else {
        console.log('Đăng ký chủ đề thành công!', topic);
      }
    });
  },
  publish: (topic, message) => {
    client.publish(topic, message, (err) => {
      if (err) {
        console.error('❌ Gửi tin nhắn thất bại:', topic, err.message);
      } else {
        console.log('✅ Gửi tin nhắn thành công!', topic, message);
      }
    });
  },
  listenToTopic: (topic, callback) => {
    client.on('message', (receivedTopic, message) => {
      if (receivedTopic === topic) {
        callback(message.toString());
      }
    });
  },
  disconnect: () => {
    client.end(() => {
      console.log('✅ Đã ngắt kết nối khỏi MQTT Broker!');
    });
  },
  init: () => {
    mqttHandler.connect();
    mqttHandler.subscribe(MqttTopicEnum.DataSensor);
    mqttHandler.listenToTopic(MqttTopicEnum.DataSensor, (message) => {
      const data = JSON.parse(message);

      if (data) {
        sensorModel.create({
          temperature: data.temperature,
          humidity: data.humidity,
          light: data.light,
        });
      }
      console.log('Received data:', data);
    });
  },
};
