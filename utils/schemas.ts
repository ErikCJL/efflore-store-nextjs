import { z, ZodSchema } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Nome deve ter pelo menos 4 caracteres.",
    })
    .max(100, {
      message: "Nome deve ter no máximo 100 caracteres.",
    }),
  company: z.string(),
  note: z.string(),
  season: z.string(),
  intensity: z.string(),
  duration: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: "Preço deve ser maior que 0",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "Descrição deve ter entre 10 e 1000 palavras.",
    }
  ),
  style: z.string(),
  gender: z.string(),
  discount: z.coerce.number().int().default(0),
  preference: z.string(),
});

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "Product ID cannot be empty",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author name cannot be empty",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author image URL cannot be empty",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters long" })
    .max(1000, { message: "Comment must be at most 1000 characters long" }),
});
