import sql from "../config/db.js";

export const AuthService = {
  // 1. Регистрация
  async registerUser(userData) {
    const { email, password, avatar, role = "user" } = userData;
    try {
      const [existingUser] = await sql`
        SELECT id FROM users WHERE email = ${email}
      `;

      if (existingUser) {
        throw new Error("USER_EXISTS");
      }

      const hashedPassword = await Bun.password.hash(password);

      const [newUser] = await sql`
        INSERT INTO users (email, password, avatar, role)
        VALUES (${email}, ${hashedPassword}, ${avatar || null}, ${role})
        RETURNING id::text AS "id", email, avatar, role, created_at AS "createdAt"
      `;

      return newUser;
    } catch (error) {
      console.error("❌ Error registering user:", error);
      throw error;
    }
  },

  // 2. Логин
  async loginUser(email, password) {
    try {
      const [user] = await sql`
        SELECT id::text AS "id", email, password, avatar, role 
        FROM users 
        WHERE email = ${email}
      `;

      if (!user) return null;

      const isPasswordValid = await Bun.password.verify(password, user.password);
      if (!isPasswordValid) return null;

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("❌ Error logging in user:", error);
      throw new Error("Failed to log in user");
    }
  },

  // 3. Получение по ID
  async getUser(id) {
    try {
      const [user] = await sql`
        SELECT id::text AS "id", email, avatar, role, created_at AS "createdAt"
        FROM users 
        WHERE id = ${id}::bigint
      `;
      return user || null;
    } catch (error) {
      console.error("❌ Error getting user:", error);
      return null;
    }
  },


};