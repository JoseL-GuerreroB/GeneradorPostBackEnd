import jwt from "jsonwebtoken";
import { jwtRefresh, jwtSecret } from "../libs/config.js";
import { erroresToken } from "../libs/jwt.js";
import fsxtRT from "fs-extra";

export const requiereToken = async (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) return res.status(401).json({ error: "Token inexistente", mensaje: "No existe el token en el header, usa formato Bearer" });
    token = token.split(" ")[1];
    // Bearer tokenfdvo444...
    const { uid } = jwt.verify(token, jwtSecret);
    req.uid = uid;
    next();
  } catch (error) {
    if (req.files?.image) await fsxtRT.remove(req.files.image.tempFilePath);
    return res.status(401).json({ error: erroresToken[error.message] });
  }
}

export const requiereRefToken = async (req, res, next) => {
  try {
    let refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: "Token inexistente", mensaje: "No existe el token" });
    const { uid } = jwt.verify(refreshToken, jwtRefresh);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: erroresToken[error.message] });
  }
}