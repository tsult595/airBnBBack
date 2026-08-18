import sql from "./config/db.js";

async function migratePush() {
  console.log("🛠️ Applying database schema...");

  try {
    // 1. Accommodations
    await sql`
      CREATE TABLE IF NOT EXISTS accommodations (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        city TEXT NOT NULL DEFAULT 'Баку',
        location TEXT NOT NULL,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        rate NUMERIC(3, 2) NOT NULL,
        image_url TEXT NOT NULL,
        images TEXT[] DEFAULT '{}',
        max_guests INTEGER NOT NULL,
        amenities TEXT[] DEFAULT '{}',
        self_check_in BOOLEAN DEFAULT FALSE,
        bathrooms_count INT DEFAULT 1,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // 2. Users (🟢 Добавили role и created_at)
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        avatar TEXT,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // Безопасное добавление колонок на случай, если таблица users уже создана
    await sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user',
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    `;


  await sql `
  CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  accommodation_id INT NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, accommodation_id) -- Предотвращает дублирование лайков
);
  `


    // 3. Bookings
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id BIGSERIAL PRIMARY KEY,
        accommodation_id BIGINT NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
        user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status TEXT NOT NULL DEFAULT 'pending',
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    console.log("✅ Database schema is up to date.");
  } catch (error) {
    console.error("❌ Failed to apply schema:", error);
    process.exitCode = 1;
  } finally {
    await sql.end({ timeout: 5 });
  }
}

migratePush();