import { Elysia } from "elysia";
import { AccommodationController } from "../controllers/accommodation.controller.js";
import { 
  getAccommodationsSchema, 
  getByRateSchema, 
  getByIdSchema 
} from "../schemas/accommodation.schema.js";

export const accommodationRoutes = new Elysia({ prefix: "/accommodations" })
  .get("/", AccommodationController.getAll, getAccommodationsSchema)
  .get("/rate/:rate", AccommodationController.getTopByRate, getByRateSchema)
  .get("/:id", AccommodationController.getById, getByIdSchema);