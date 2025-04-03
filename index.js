import express from "express";
import { routes } from "./src/routes/index.route.js";
import { database } from "./src/config/database.js";
import { mqttHandler } from "./src/config/mqtt.js";

const app = express();
const port = 8000;

app.use(express.json());

database.connect();
// mqttHandler.connect();

routes(app);
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
