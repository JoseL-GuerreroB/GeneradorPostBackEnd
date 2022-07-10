import mongoose from "mongoose";
import { MongoDB_URL } from "./config.js";

export default async function conectarDB() {
  try {
    mongoose.connect(MongoDB_URL);
    console.log("base de datos conectada");
  } catch (error) {
    console.log(error);
  }
}