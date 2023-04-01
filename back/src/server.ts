import { config } from "dotenv";
config();
import { App } from "./app.js";

const port = 8000;

new App().server.listen(port, () => {
  console.log(`Servidor criado em: http://localhost:${port}`);
});
