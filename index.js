import express from "express";
import { routes } from "./src/routes/index.route.js";

const app = express();
const port = 3000;

routes(app);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
