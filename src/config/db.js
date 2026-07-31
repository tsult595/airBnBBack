import {config} from "dotenv";
import postgres from 'postgres';

config(); // Загружаем переменные окружения из .env

const connectionString =
	process.env.database_url ||
	process.env.DATABASE_URL ||
	process.env.DATABASE_URL_UNPOOLED ||
	process.env.POSTGRES_URL ||
	process.env.POSTGRES_URL_NON_POOLING ||
	"postgres://postgres:root@127.0.0.1:5432/airbnb_db";

const sql = postgres(connectionString);

export default sql;