import postgres from 'postgres';

const connectionString =
	process.env.database_url ||
	process.env.DATABASE_URL ||
	process.env.DATABASE_URL_UNPOOLED ||
	process.env.POSTGRES_URL ||
	process.env.POSTGRES_URL_NON_POOLING ||
	Bun.env?.DATABASE_URL ||
	"postgres://postgres:root@127.0.0.1:5432/airbnb_db";

const isLocalConnection =
	connectionString.includes("127.0.0.1") ||
	connectionString.includes("localhost");

console.log("🔌 Подключаемся к базе данных...");

const sql = postgres(
	connectionString,
	isLocalConnection ? {} : { ssl: 'require' }
);

export default sql;