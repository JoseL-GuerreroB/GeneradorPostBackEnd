import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const url_MongoDB = process.env.url_MongoDB;

export const cloudName = process.env.cloudName;
export const apiKey = process.env.apiKey;
export const apiSecret = process.env.apiSecret;
export const imgDefaultUrl = process.env.imgDefaultUrl;
export const imgDefaultPID = process.env.imgDefaultPID;
export const imgPostDefUrl = process.env.imgPostDefUrl;
export const imgPostDefPID = process.env.imgPostDefPID;

export const jwtSecret = process.env.jwtSecret;
export const jwtRefresh = process.env.jwtRefresh;
export const Modo = process.env.Modo;

export const ORIGIN1 = process.env.ORIGIN1;