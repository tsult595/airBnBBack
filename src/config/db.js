import {config} from "dotenv";
import postgres from 'postgres';

config(); // Загружаем переменные окружения из .env


console.log(process.env.DATABASE_URL);

// Заменили localhost на 127.0.0.1
const sql = postgres(Bun.env.DATABASE_URL || "postgres://postgres:root@127.0.0.1:5432/airbnb_db");

export default sql;