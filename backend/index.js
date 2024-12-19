import express from "express";
import "dotenv/config";
import { createPgConnection } from "./db/postgres.js";
import { createRouter } from "./router/router.js";
import { createRepository } from "./repository/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 3000;
const corsOptions = {
  origin: function (origin, callback) {
    if (origin.includes("localhost")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials to be included in requests
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const db = await createPgConnection();
const repository = createRepository(db);
await createRouter(app, repository);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
