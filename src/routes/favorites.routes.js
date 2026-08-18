import { Elysia } from "elysia";


import { FavoritesController } from "../controllers/favorites.controller.js";
import { addFavoriteSchema, removeFavoriteSchema , getFavoritesSchema} from "../schemas/favorites.schema.js";

export const favoritesRoutes = new Elysia({ prefix: "/favorites" })
  .post("/add", FavoritesController.addFavorite, addFavoriteSchema)
  .post("/remove", FavoritesController.removeFavorite, removeFavoriteSchema)
  .get("/", FavoritesController.getFavorites, getFavoritesSchema);