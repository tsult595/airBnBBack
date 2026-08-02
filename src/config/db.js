import postgres from 'postgres';

// В Bun переменные из .env подгружаются автоматически в process.env и Bun.env
const connectionString = process.env.DATABASE_URL || Bun.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ ОШИБКА: DATABASE_URL не найден в файле .env!");
} else {
  console.log("🔌 Подключаемся к базе данных...");
}

// Передаем SSL-настройки для облачной базы Neon
const sql = postgres(connectionString, {
  ssl: 'require', // Обязательно для Neon DB!
});

export default sql;