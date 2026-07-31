import { t } from "elysia";

export const getAccommodationsSchema = {
  query: t.Object({
    category: t.Optional(t.String()),
    rate: t.Optional(t.String()),
    location: t.Optional(t.String()),
    guests: t.Optional(t.String()),
    checkIn: t.Optional(t.String()),
    checkOut: t.Optional(t.String()),
  }),
};

export const getByRateSchema = {
  params: t.Object({
    rate: t.String(),
  }),
};

export const getByIdSchema = {
  params: t.Object({
    id: t.String(),
  }),
};