import { t } from "elysia";

export const loginSchema = {
  body: t.Object({
    email: t.String(),
    password: t.String(),
  }),

};

export const registerSchema = {
  body: t.Object({
    email: t.String(),
    password: t.String(),
    avatar: t.Optional(t.String()),
  }),
};

export const getUserSchema = {
  params: t.Object({
    id: t.String(),
  }),
};

export const updateUserSchema = {
  params: t.Object({
    id: t.String(),
  }),
  body: t.Object({
    email: t.Optional(t.String()),
    password: t.Optional(t.String()),
    avatar: t.Optional(t.String()),
  }),
};

export const deleteUserSchema = {
  params: t.Object({
    id: t.String(),
  }),
};
