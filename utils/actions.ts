"use server";

import { currentUser } from "@clerk/nextjs/server";
import { z, ZodSchema } from "zod";
import { redirect } from "next/navigation";
import { uploadImage } from "./supabase";

import db from "@/utils/db";

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  return user;
};

export async function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): Promise<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
}

export async function productSchema() {
  return z.object({
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
}

async function validateImageFile() {
  const maxUploadSize = 1024 * 1024 * 5;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `Arquivo deve ser menor que 5MB`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "Arquivo precisa ser uma imagem");
}

export async function imageSchema() {
  return z.object({
    image: await validateImageFile(),
  });
}

export async function fetchFeaturedProducts() {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
}

export async function fetchAllProducts({ search = "" }: { search: string }) {
  return await db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function fetchSingleProduct(productId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    redirect("/products");
  }
  return product;
}

export async function createProductAction(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
): Promise<{ message: string }> {
  const user = await getAuthUser();
  console.log(prevState);
  try {
    const rawData = Object.fromEntries(formData);

    const file = formData.get("image") as File;
    const validatedFields = await validateWithZodSchema(
      await productSchema(),
      rawData
    );
    const validatedFile = await validateWithZodSchema(await imageSchema(), {
      image: file,
    });
    const fullPath = await uploadImage(validatedFile.image);

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
        discount: validatedFields.discount ?? 0,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
}
