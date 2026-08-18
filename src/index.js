import dotenv from "dotenv";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { accommodationRoutes } from "./routes/accommodation.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { favoritesRoutes } from "./routes/favorites.routes.js";

dotenv.config();

const allowedOrigin = "http://localhost:3000";

const applyCorsHeaders = ({ set }) => {
  set.headers["access-control-allow-origin"] = allowedOrigin;
  set.headers["access-control-allow-credentials"] = "true";
  set.headers.vary = "Origin";
};

const app = new Elysia()
  // 🔥 Глобальный CORS для всех роутов и Preflight-запросов (OPTIONS)
  .use(
    cors({
      origin: allowedOrigin,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  )
  .headers({
    "access-control-allow-origin": allowedOrigin,
    "access-control-allow-credentials": "true",
    vary: "Origin",
  })
  .onAfterHandle(applyCorsHeaders)
  // Выводим все ошибки в консоль терминала бэкенда, чтобы видеть, если падаем
  .onError(({ code, error, set }) => {
    console.error("❌ Backend Error:", code, error);
    applyCorsHeaders({ set });
    return { error: error.message || "Internal Server Error" };
  })
  .use(accommodationRoutes)
  .use(userRoutes)
  .use(favoritesRoutes)
  .listen(5000);

console.log(`🚀 Elysia Server running on http://${app.server?.hostname}:${app.server?.port}`);