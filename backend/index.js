import express from "express";
import "dotenv/config";
import { createPgConnection } from "./db/postgres.js";
import { createRouter } from "./router/router.js";
import { createRepository } from "./repository/index.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;
app.use(cookieParser());
app.use(express.json());

const db = await createPgConnection();
const repository = createRepository(db);
await createRouter(app, repository);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
