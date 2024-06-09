import { z } from "zod";

export const ProductSchema = z.object({
  productName: z.string().min(1),
  category: z.string().min(1),
  price: z.string().min(1),
  cost: z.string().min(1),
  stockAmount: z.string().min(1),
  options: z.string().min(1),
});
