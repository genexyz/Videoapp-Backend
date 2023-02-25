import dotenv from "dotenv";

dotenv.config();

export const port = Number(process.env.PORT);

export const db_URL = String(process.env.DB_URL);
