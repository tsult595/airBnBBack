import sql from "../config/db.js";

export const FavoritesService = {
  // 1. Получение всех избранных размещений пользователя
  async getFavoritesByUserId(userId) {
    try {
      const parsedUserId = Number(userId);

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
          a.created_at AS "createdAt",
          true AS "isFavorite"
        FROM favorites f
        JOIN accommodations a ON a.id = f.accommodation_id
        WHERE f.user_id = ${parsedUserId}::bigint
        ORDER BY f.created_at DESC;
      `;

      return items;
    } catch (error) {
      console.error("❌ Ошибка SQL в FavoritesService.getFavoritesByUserId:", error);
      throw error;
    }
  },

  // 2. Добавление в избранное
  async addFavorite(userId, accommodationId) {
    try {
      const parsedUserId = Number(userId);
      const parsedAccommodationId = Number(accommodationId);

      // ON CONFLICT предотвращает дублирование (если запись уже есть — ничего не делаем)
      const [result] = await sql`
        INSERT INTO favorites (user_id, accommodation_id)
        VALUES (${parsedUserId}::bigint, ${parsedAccommodationId}::bigint)
        ON CONFLICT (user_id, accommodation_id) DO NOTHING
        RETURNING *;
      `;

      return { success: true, favorite: result || null };
    } catch (error) {
      console.error("❌ Ошибка SQL в FavoritesService.addFavorite:", error);
      return { success: false, message: error.message };
    }
  },

  // 3. Удаление из избранного
  async removeFavorite(userId, accommodationId) {
    try {
      const parsedUserId = Number(userId);
      const parsedAccommodationId = Number(accommodationId);

      await sql`
        DELETE FROM favorites
        WHERE user_id = ${parsedUserId}::bigint 
          AND accommodation_id = ${parsedAccommodationId}::bigint;
      `;

      return { success: true };
    } catch (error) {
      console.error("❌ Ошибка SQL в FavoritesService.removeFavorite:", error);
      return { success: false, message: error.message };
    }
  }
};