import dotenv from "dotenv";

dotenv.config();

export const MongoDB_URL = process.env.MongoDB;
export const Port = process.env.PORT;
export const cloudName = process.env.cloudName;
export const apiKey = process.env.apiKey;
export const apiSecret = process.env.apiSecret;