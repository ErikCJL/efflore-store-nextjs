import { createClient } from "@supabase/supabase-js";

const bucket = "products";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: "3600",
    });

  if (error) {
    throw new Error(
      `Image upload failed: ${error.message || JSON.stringify(error)}`
    );
  }

  if (!data) throw new Error("Image upload failed: No data received.");

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};