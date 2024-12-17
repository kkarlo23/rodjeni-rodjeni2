import pg from "pg";

export async function createPgConnection() {
  const { Pool } = pg;
  const client = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: "5432",
    database: process.env.PG_DB,
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database", error);
  }

  return client;
}
