import { Client } from "pg";

export const client = new Client({
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.HOST,
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
