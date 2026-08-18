import { t } from "elysia";

export const getFavoritesSchema = {
  query: t.Object({
    userId: t.Numeric(), // 🟢 Принимает "2" или 2
  }),
};

export const addFavoriteSchema = {
  body: t.Object({
    userId: t.Numeric(),         // 🟢 Принимает "2" или 2
    accommodationId: t.Numeric(), // 🟢 Принимает "10" или 10
  }),
};

export const removeFavoriteSchema = {
  body: t.Object({
    userId: t.Numeric(),
    accommodationId: t.Numeric(),
  }),
};
