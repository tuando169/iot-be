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
// mqttHandler.connect();

routes(app);
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
