import mongoose from "mongoose";
export const userSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true
  },
  correo: {
    type: String,
    require: true,
    unique: true
  },
  contrasena: {
    type: String,
    require: true
  },
  contrasena2: {
    type: String,
    require: true
  },
  imagen: {
    url: String,
    public_id: String
  }
});

export default mongoose.model("User",userSchema);