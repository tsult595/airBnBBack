import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { AuthController } from "../controllers/auth.controller.js";
import {
  registerSchema,
  loginSchema,
  getUserSchema,
  updateUserSchema,
  deleteUserSchema
} from "../schemas/auth.schema.js";

export const userRoutes = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "SUPER_SECRET_KEY", // Берём секрет из .env
      exp: "7d" // Токен живёт 7 дней
    })
  )
  .post("/register", AuthController.registerUser, registerSchema)
  .post("/login", AuthController.loginUser, loginSchema)
  .get("/me", AuthController.getMe) // Защищенный маршрут проверки токена
  .get("/:id", AuthController.getUser, getUserSchema)
  .put("/:id", AuthController.updateUser, updateUserSchema)
  .delete("/:id", AuthController.deleteUser, deleteUserSchema);