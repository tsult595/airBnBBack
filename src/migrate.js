import sql from "./config/db.js";

async function migratePush() {
  console.log("🛠️  Applying database schema...");

  try {
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
        max_guests INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      ALTER TABLE accommodations 
      ADD COLUMN IF NOT EXISTS city TEXT NOT NULL DEFAULT 'Баку';
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id BIGSERIAL PRIMARY KEY,
        accommodation_id BIGINT NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
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