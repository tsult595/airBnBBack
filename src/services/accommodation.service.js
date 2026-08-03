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
    amenities 
  } = filters;

  const parsedRate = rate && !isNaN(parseFloat(rate)) ? parseFloat(rate) : null;
  const parsedGuests = guests && !isNaN(parseInt(guests)) ? parseInt(guests) : null;
  
  // Преобразуем строку удобств "Wi-Fi,Кондиционер" в массив ["Wi-Fi", "Кондиционер"]
  const amenitiesList = amenities ? amenities.split(',').map(a => a.trim()) : [];

  try {
    return await sql`
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
        COALESCE(a.self_check_in, false) AS "selfCheckIn",
        COALESCE(a.bathrooms_count, 1) AS "bathroomsCount",
        a.created_at AS "createdAt"
      FROM accommodations a
      WHERE 1=1
        ${category ? sql`AND (a.type = ${category} OR a.category = ${category})` : sql``}
        ${parsedRate !== null ? sql`AND a.rate >= ${parsedRate}` : sql``}
        ${location ? sql`AND a.location ILIKE ${'%' + location + '%'}` : sql``}
        ${city ? sql`AND (a.city ILIKE ${'%' + city + '%'} OR a.location ILIKE ${'%' + city + '%'})` : sql``}
        ${parsedGuests !== null ? sql`AND a.max_guests >= ${parsedGuests}` : sql``}
        
        /* ⬇️ Фильтр по Самостоятельному прибытию */
        ${selfCheckIn === 'true' ? sql`AND a.self_check_in = TRUE` : sql``}
        
        /* ⬇️ Фильтр по количеству ванных (> 1) */
        ${moreThanOneBath === 'true' ? sql`AND a.bathrooms_count > 1` : sql``}
        
        /* ⬇️ Фильтр по удобствам (проверяет, содержит ли массив amenities все выбранные удобства) */
        ${amenitiesList.length > 0 ? sql`AND a.amenities @> ${amenitiesList}::text[]` : sql``}

        ${
          checkIn && checkOut
            ? sql`
              AND NOT EXISTS (
                SELECT 1 
                FROM bookings b 
                WHERE b.accommodation_id = a.id
                  AND b.status != 'cancelled'
                  AND b.check_in < ${checkOut}::date 
                  AND b.check_out > ${checkIn}::date
              )
            `
            : sql``
        }
      ORDER BY a.rate DESC, a.created_at DESC
    `;
  } catch (error) {
    console.error("❌ Ошибка SQL в AccommodationService.getAll:", error);
    return [];
  }
},

  // 2. Топ по рейтингу
  async getTopByRate(minRate) {
    const parsedRate = parseFloat(minRate) || 0;

    try {
      return await sql`
        SELECT 
          a.id::text AS "id", 
          a.title, 
          a.type, 
          a.category, 
          COALESCE(a.city, 'Баку') AS "city",
          a.location, 
          a.latitude AS "lat", 
          a.longitude AS "lng", 
          a.price::float AS "price", 
          a.rate::float AS "rate", 
          a.image_url AS "imageUrl"
        FROM accommodations a
        WHERE a.rate >= ${parsedRate}
        ORDER BY a.rate DESC
        LIMIT 10
      `;
    } catch (error) {
      console.error("❌ Ошибка SQL в getTopByRate:", error);
      return [];
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
          a.max_guests AS "maxGuests"
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
};