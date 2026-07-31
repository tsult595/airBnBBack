import dotenv from "dotenv";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { accommodationRoutes } from "./routes/accommodation.routes.js";

dotenv.config();
const app = new Elysia()
  .use(cors())
  .use(accommodationRoutes) // Подключаем роуты
  .listen(5000);

console.log(`🚀 Elysia Server running on http://${app.server?.hostname}:${app.server?.port}`);