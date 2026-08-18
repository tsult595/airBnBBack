import { FavoritesService } from "../services/favorites.service.js";

const allowedOrigin = "http://localhost:3000";

const createJsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json;charset=utf-8",
      "access-control-allow-origin": allowedOrigin,
      "access-control-allow-credentials": "true",
      vary: "Origin",
    },
  });

const createEmptyResponse = () =>
  new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": allowedOrigin,
      "access-control-allow-credentials": "true",
      vary: "Origin",
    },
  });

const applyCorsHeaders = (set) => {
  set.headers["access-control-allow-origin"] = allowedOrigin;
  set.headers["access-control-allow-credentials"] = "true";
  set.headers.vary = "Origin";
};


export const FavoritesController = {
  async getFavorites({ query, set }) {
    applyCorsHeaders(set);
    const { userId } = query;

    if (!userId) {
      set.status = 400;
      return createJsonResponse({ message: "userId is required" }, 400);
    }

    const favorites = await FavoritesService.getFavoritesByUserId(userId);
    return createJsonResponse(favorites);
  },

    async addFavorite({ body, set }) {
    applyCorsHeaders(set);
    const { userId, accommodationId } = body;

    if (!userId || !accommodationId) {
      set.status = 400;
      return createJsonResponse({ message: "userId and accommodationId are required" }, 400);
    }

    const result = await FavoritesService.addFavorite(userId, accommodationId);
    if (result.success) {
      return createJsonResponse({ message: "Favorite added successfully" }, 201);
    } else {
      set.status = 400;
      return createJsonResponse({ message: result.message }, 400);
    }
    },

    async removeFavorite({ body, set }) {
    applyCorsHeaders(set);
    const { userId, accommodationId } = body;

    if (!userId || !accommodationId) {
      set.status = 400;
      return createJsonResponse({ message: "userId and accommodationId are required" }, 400);
    }

    const result = await FavoritesService.removeFavorite(userId, accommodationId);
    if (result.success) {
      return createJsonResponse({ message: "Favorite removed successfully" }, 200);
    } else {
      set.status = 400;
      return createJsonResponse({ message: result.message }, 400);
    }
    }

}