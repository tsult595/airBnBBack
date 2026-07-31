import sql from "../config/db.js";

export const AccommodationService = {
  // Получение списком (для главной и страницы фильтрации с картой)
  async getAll(filters = {}) {
    const { category, rate, location, guests, checkIn, checkOut } = filters;

    const parsedRate = rate && !isNaN(parseFloat(rate)) ? parseFloat(rate) : null;
    const parsedGuests = guests && !isNaN(parseInt(guests)) ? parseInt(guests) : null;

    return await sql`
      SELECT 
        a.id, 
        a.title, 
        a.description, 
        a.type, 
        a.category, 
        a.location, 
        a.latitude AS "lat", 
        a.longitude AS "lng", 
        a.price, 
        a.rate, 
        a.image_url AS "imageUrl", 
        a.max_guests AS "maxGuests", 
        a.created_at AS "createdAt"
      FROM accommodations a
      WHERE 1=1
        ${category ? sql`AND (a.type = ${category} OR a.category = ${category})` : sql``}
        ${parsedRate !== null ? sql`AND a.rate >= ${parsedRate}` : sql``}
        ${location ? sql`AND a.location ILIKE ${'%' + location + '%'}` : sql``}
        ${parsedGuests !== null ? sql`AND a.max_guests >= ${parsedGuests}` : sql``}
        ${checkIn && checkOut ? sql`
          AND a.id NOT IN (
            SELECT accommodation_id 
            FROM bookings 
            WHERE status != 'cancelled'
              AND check_in < ${checkOut}::date 
              AND check_out > ${checkIn}::date
          )
        ` : sql``}
      -- 🔥 Сортируем сначала по топовому рейтингу (5.0 -> 4.9 -> ...), затем по свежести!
      ORDER BY a.rate DESC, a.created_at DESC
    `;
  },

  // Топ по рейтингу (для CardSection)
  async getTopByRate(minRate) {
    const parsedRate = parseFloat(minRate) || 0;

    return await sql`
      SELECT 
        a.id, 
        a.title, 
        a.type, 
        a.category, 
        a.location, 
        a.latitude AS "lat", 
        a.longitude AS "lng", 
        a.price, 
        a.rate, 
        a.image_url AS "imageUrl"
      FROM accommodations a
      WHERE a.rate >= ${parsedRate}
      ORDER BY a.rate DESC
      LIMIT 10
    `;
  },

  // Карточка одного жилья по ID
  async getById(id) {
    const [item] = await sql`
      SELECT 
        a.id, 
        a.title, 
        a.description, 
        a.type, 
        a.category, 
        a.location, 
        a.latitude AS "lat", 
        a.longitude AS "lng", 
        a.price, 
        a.rate, 
        a.image_url AS "imageUrl", 
        a.max_guests AS "maxGuests"
      FROM accommodations a
      WHERE a.id = ${id}
      LIMIT 1
    `;
    return item;
  }
};