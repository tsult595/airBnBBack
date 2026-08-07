import { AuthService } from "../services/auth.service.js";

export const AuthController = {
  // 🟢 Регистрация
  async registerUser({ body, jwt, set }) {
    try {
      const newUser = await AuthService.registerUser(body);
      
      // Генерация токена для нового пользователя
      const token = await jwt.sign({ 
        id: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      });

      set.status = 201;
      return { user: newUser, token };
    } catch (error) {
      if (error.message === "USER_EXISTS") {
        set.status = 400;
        return { message: "Пользователь с таким email уже существует" };
      }
      console.error("❌ Error in registerUser controller:", error);
      set.status = 500;
      return { message: "Failed to register user" };
    }
  },

  // 🟢 Вход (Login)
  async loginUser({ body, jwt, set }) {
    const { email, password } = body;
    try {
      const user = await AuthService.loginUser(email, password);
      
      if (!user) {
        set.status = 401;
        return { message: "Неверный email или пароль" };
      }

      // Генерируем JWT токен
      const token = await jwt.sign({ 
        id: user.id, 
        email: user.email, 
        role: user.role 
      });

      return { user, token };
    } catch (error) {
      console.error("❌ Error in loginUser controller:", error);
      set.status = 500;
      return { message: "Failed to log in user" };
    }
  },

  // 🟢 Получение данных текущего авторизованного пользователя
  async getMe({ jwt, headers, set }) {
    const authHeader = headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      set.status = 401;
      return { message: "Unauthorized" };
    }

    const payload = await jwt.verify(token);
    if (!payload) {
      set.status = 401;
      return { message: "Invalid token" };
    }

    const user = await AuthService.getUser(payload.id);
    if (!user) {
      set.status = 404;
      return { message: "User not found" };
    }

    return user;
  },

  // 🟢 Получение по ID
  async getUser({ params, set }) {
    try {
      const user = await AuthService.getUser(params.id);
      if (!user) {
        set.status = 404;
        return { message: "User not found" };
      }
      return user;
    } catch (error) {
      console.error("❌ Error in getUser controller:", error);
      set.status = 500;
      return { message: "Failed to get user" };
    }
  }
};