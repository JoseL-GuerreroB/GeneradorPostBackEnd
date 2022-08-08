import mongoose from 'mongoose';
import { url_MongoDB } from './libs/config.js';

const conexionDB = async() => {
  try {
    await mongoose.connect(url_MongoDB);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
}

export default conexionDB;