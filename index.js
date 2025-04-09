import express from 'express';
import { routes } from './src/routes/index.route.js';
import { database } from './src/config/database.js';
import { mqttHandler, MqttTopicEnum } from './src/config/mqtt.js';
import cors from 'cors';
import { sensorModel } from './src/models/sensor.model.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

database.connect();
mqttHandler.init();

setInterval(() => {
  const temperature = Math.floor(Math.random() * 100);
  const humidity = Math.floor(Math.random() * 100);
  const light = Math.floor(Math.random() * 100);
  const data = {
    temperature: temperature,
    humidity: humidity,
    light: light,
  };
  if (data) {
    sensorModel.create({
      temperature: data.temperature,
      humidity: data.humidity,
      light: data.light,
    });
    console.log('Received data:', data);
  }
}, 5000);

routes(app);
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
