import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  features: z.string().min(1, "Features are required"),
  price: z.coerce.number().positive("Price must be positive"),
  rating: z.coerce.number().min(0).max(5, "Rating must be between 0 and 5"),
  inStock: z.enum(["true", "false"]),
  category: z.string().min(1, "Category is required"),
  images: z.any().optional(),
});
