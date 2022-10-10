import { validationResult } from "express-validator";
import fsxtR from "fs-extra";

const valRes = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    if (req.files?.image) await fsxtR.remove(req.files.image.tempFilePath);
    return res.status(400).json({ errores: errors.array() });
  }
  next();
}

export default valRes;