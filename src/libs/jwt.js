import jwt from "jsonwebtoken";
import { jwtRefresh, jwtSecret, Modo } from "./config.js";

export const generarToken = (uid) => {
  try {
    const caducidad = 60 * 15;
    const token = jwt.sign({ uid }, jwtSecret, { expiresIn: caducidad });
    return { token, caducidad };
  } catch (error) {
    console.log(error);
  }
}

export const generarRefreshToken = (uid, res) => {
  const caducidad = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, jwtRefresh, { expiresIn: caducidad });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(Modo === "developer"),
      expires: new Date(Date.now() + 1000 * caducidad)
    })
  } catch (error) {
    console.log(error);
  }
}

export const erroresToken = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no válido",
  "No Bearer": "Utiliza formato Bearer",
  "jwt malformed": "JWT formato no válido",
};