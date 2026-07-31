import { AccommodationService } from "../services/accommodation.service.js";

export const AccommodationController = {
  async getAll({ query }) {
    return await AccommodationService.getAll(query);
  },

  async getTopByRate({ params }) {
    return await AccommodationService.getTopByRate(params.rate);
  },

  async getById({ params, set }) {
    const item = await AccommodationService.getById(params.id);

    if (!item) {
      set.status = 404;
      return { message: "Размещение не найдено" };
    }

    return item;
  }
};