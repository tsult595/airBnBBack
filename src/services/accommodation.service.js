import sql from "../config/db.js";

export const AccommodationService = {
  // 1. Получение списка с фильтрацией (для главной и карты)
  async getAll(filters = {}) {
  const { 
    category, 
    rate, 
    location, 
    city, 
    guests, 
    checkIn, 
    checkOut,
    selfCheckIn,
    moreThanOneBath,
    amenities,
    limit = 5,
    page = 1
  } = filters;

  const parsedRate = rate && !isNaN(parseFloat(rate)) ? parseFloat(rate) : null;
  const parsedGuests = guests && !isNaN(parseInt(guests)) ? parseInt(guests) : null;
  const parsedLimit = parseInt(limit, 10) || 5;
  const parsedPage = parseInt(page, 10) || 1;
  const offset = (parsedPage - 1) * parsedLimit;

  const amenitiesList = amenities ? amenities.split(',').map(a => a.trim()) : [];

  try {
    // 🟢 1. Выносим единое условие WHERE
    const whereClause = sql`
      WHERE 1=1
        ${category ? sql`AND (a.type = ${category} OR a.category = ${category})` : sql``}
        ${parsedRate !== null ? sql`AND a.rate >= ${parsedRate}` : sql``}
        ${location ? sql`AND a.location ILIKE ${'%' + location + '%'}` : sql``}
        ${city ? sql`AND (a.city ILIKE ${'%' + city + '%'} OR a.location ILIKE ${'%' + city + '%'})` : sql``}
        ${parsedGuests !== null ? sql`AND a.max_guests >= ${parsedGuests}` : sql``}
        ${selfCheckIn === 'true' ? sql`AND a.self_check_in = TRUE` : sql``}
        ${moreThanOneBath === 'true' ? sql`AND a.bathrooms_count > 1` : sql``}
        ${amenitiesList.length > 0 ? sql`AND a.amenities @> ${amenitiesList}::text[]` : sql``}
        ${
          checkIn && checkOut
            ? sql`
              AND NOT EXISTS (
                SELECT 1 FROM bookings b 
                WHERE b.accommodation_id = a.id
                  AND b.status != 'cancelled'
                  AND b.check_in < ${checkOut}::date 
                  AND b.check_out > ${checkIn}::date
              )
            `
            : sql``
        }
    `;

    // 🟢 2. Запрос на общее количество
    const [countResult] = await sql`
      SELECT COUNT(*)::int AS total
      FROM accommodations a
      ${whereClause}
    `;

    const totalCount = countResult?.total || 0;
    const totalPages = Math.ceil(totalCount / parsedLimit) || 1;

    // 🟢 3. Запрос на сами записи
    const items = await sql`
      SELECT 
        a.id::text AS "id", 
        a.title, 
        a.description, 
        a.type, 
        a.category, 
        COALESCE(a.city, 'Баку') AS "city",
        a.location, 
        a.latitude AS "lat", 
        a.longitude AS "lng", 
        a.price::float AS "price", 
        a.rate::float AS "rate", 
        a.image_url AS "imageUrl", 
        a.max_guests AS "maxGuests",
        COALESCE(a.amenities, '{}') AS "amenities",
        COALESCE(a.images, '{}') AS "images",
        COALESCE(a.self_check_in, false) AS "selfCheckIn",
        COALESCE(a.bathrooms_count, 1) AS "bathroomsCount",
        a.created_at AS "createdAt"
      FROM accommodations a
      ${whereClause}
      ORDER BY a.rate DESC, a.created_at DESC
      LIMIT ${parsedLimit}
      OFFSET ${offset}
    `;

    return {
      items,
      totalCount,
      totalPages,
      page: parsedPage,
      limit: parsedLimit
    };
  } catch (error) {
    console.error("❌ Ошибка SQL в AccommodationService.getAll:", error);
    return { items: [], totalCount: 0, totalPages: 1, page: 1, limit: 5 };
  }
},
  // 3. Получение одного объекта по ID
  async getById(id) {
  try {
    const rows = await sql`
      SELECT 
        a.id::text AS "id", 
        a.title, 
        a.description, 
        a.type, 
        a.category, 
        COALESCE(a.city, 'Баку') AS "city",
        a.location, 
        a.latitude AS "lat", 
        a.longitude AS "lng", 
        a.price::float AS "price", 
        a.rate::float AS "rate", 
        a.image_url AS "imageUrl", 
        COALESCE(a.images, '{}') AS "images",               -- 🟢 Добавили массив дополнительных фото
        a.max_guests AS "maxGuests",
        COALESCE(a.amenities, '{}') AS "amenities",         -- 🟢 Добавили удобства
        COALESCE(a.self_check_in, false) AS "selfCheckIn",  -- 🟢 Добавили самозаезд
        COALESCE(a.bathrooms_count, 1) AS "bathroomsCount" -- 🟢 Добавили кол-во ванных
      FROM accommodations a
      WHERE a.id = ${id}::bigint
      LIMIT 1
    `;
    
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("❌ Ошибка SQL в getById:", error);
    return null;
  }
}

}