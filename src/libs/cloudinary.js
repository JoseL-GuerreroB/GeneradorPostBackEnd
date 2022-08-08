import cloudinary from "cloudinary";
import { apiKey, apiSecret, cloudName } from "./config.js";


cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
})

export const subirFoto = async filePath => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: "imgPerfil"
  });
}

export const eliminarFotoOIMG = async public_id => {
  return await cloudinary.v2.uploader.destroy(public_id);
}

// -------------------

export const subirIMG = async filePath => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: "imagenes"
  });
}
