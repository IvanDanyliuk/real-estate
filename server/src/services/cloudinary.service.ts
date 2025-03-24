import cloudinary from "../config/cloudinary";
import { getFileNameFromUrl } from "../utils/getFileNameFromUrl";

export const uploadToCloudinary = (fileBuffer: any) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if(error) {
          console.log("Cloudinary error", error);
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      },
    );
    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (fileUrls: string[]) => {
  const imagePublicIds = fileUrls
    .map(fileUrl => getFileNameFromUrl(fileUrl))
    .filter(item => item !== null);
  if(imagePublicIds.length > 0) {
    await cloudinary.api.delete_resources(imagePublicIds, (error, response) => {
      console.log(error, response);
    });
  } else {
    throw new Error("Cannot get the image public ID");
  }
};