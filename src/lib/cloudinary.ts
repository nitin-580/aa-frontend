import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "fyzevplm",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Uploads a base64 data URI photo to Cloudinary and returns the permanent CDN URL
 */
export async function uploadNomineePhoto(base64Data: string, nomineeId: string): Promise<string> {
  if (!base64Data || !base64Data.startsWith("data:")) {
    return "";
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      folder: "svnit_accolade_nominations",
      public_id: `nominee_${nomineeId}`,
      resource_type: "image",
      overwrite: true,
    });

    return uploadResult.secure_url || "";
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return "";
  }
}
