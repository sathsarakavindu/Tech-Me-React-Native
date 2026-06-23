import { supabase } from "@/config/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";

export const uploadVehicleImage = async (imageUri: string) => {
  try {
    const fileExt = imageUri.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `vehicle_${Date.now()}.${fileExt}`;

    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64
    });

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, decode(base64), {
        contentType: `image/${fileExt}`,
        upsert: true
      });

    if (error) {
      console.log(error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    console.log("Public URL:", publicUrlData.publicUrl);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.log("Upload Error:", error);
    throw error;
  }
};