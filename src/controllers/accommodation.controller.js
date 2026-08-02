import { AccommodationService } from "../services/accommodation.service.js";

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

export const AccommodationController = {
  async getAll({ query, set }) {
    applyCorsHeaders(set);
    return createJsonResponse(await AccommodationService.getAll(query));
  },

  async getTopByRate({ params, set }) {
    applyCorsHeaders(set);
    return createJsonResponse(await AccommodationService.getTopByRate(params.rate));
  },

  async getById({ params, set }) {
    applyCorsHeaders(set);
    const item = await AccommodationService.getById(params.id);

    if (!item) {
      set.status = 404;
      return createJsonResponse({ message: "Размещение не найдено" }, 404);
    }

    return createJsonResponse(item);
  }
};