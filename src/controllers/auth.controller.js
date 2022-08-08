import { eliminarFotoOIMG, subirFoto } from "../libs/cloudinary.js";
import User from "../models/User.js";
import fsxt from "fs-extra";
import { comparar, encriptar } from "../libs/bcrypt.js";
import { generarRefreshToken, generarToken } from "../libs/jwt.js";
import { imgDefaultPID, imgDefaultUrl } from "../libs/config.js";

export const register = async (req, res) => {
  const {name, email, password} = req.body;
    let image;
  try {
    const emailre = await User.findOne({email});
    if (emailre) return res.status(400).json({error: "Correo ya existente", mensaje: "Registrate con otro correo o inicia sesion"});
    const hashPass = await encriptar(password);
    if(req.files?.image){
      const result = await subirFoto(req.files.image.tempFilePath);
      await fsxt.remove(req.files.image.tempFilePath);
      image = {
        public_id: result.public_id,
        url: result.url
      }
    }else{
      image = {
        public_id: imgDefaultPID,
        url: imgDefaultUrl
      }
    }
    let user = new User({
      name,
      email,
      password: hashPass,
      image
    });
    user = await user.save();
    const {token, caducidad} = generarToken(user._id);
    res.status(201).json({sesion: true, mensaje: "Sesion creada", token, caducidad, user});
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde."
    });
  }
}

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user) return res.status(403).json({
      error: "Usuario no encontrado", 
      mensaje: `El correo ${email} no esta registrado, favor de registrarte para poder ingresar a la aplicacion.`
    });
    const resPassword = await comparar(password, user.password);
    if(!resPassword) return res.status(403).json({
      error: "Contraseña incorrecta",
      mensaje: "Ingresa la contraseña correcta"
    });
    const {token, caducidad} = generarToken(user._id);
    generarRefreshToken(user._id, res);
    return res.json({ token, caducidad });
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde."
    });
  }
}

export const sesion = async (req, res) => {
  const {uid} = req;
  try {
    const user = await User.findById(uid);
    if(!user) return res.status(403).json({error: "Usuario no registrado", mensaje: "No pudimos encontrar el usuario"});
    return res.status(200).json({ sesion: true, mensaje: "Sesion iniciada", user });
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde."
    });
  }
}

export const editUser = async (req, res) => {
  const newUser = req.body;
  const { uid } = req;
  let image;
  try {
    let user = await User.findById(uid);
    if (!user) return res.status(403).json({ error: "Sesion desconocida", mensaje: "Emos decidido banear tu cuenta, ya no puedes ingresar" });
    if (newUser.email) {
      let emailre = await User.findOne({ email: newUser.email });
      console.log(emailre);
      if (emailre) res.status(400).json({ error: "Correo ya existente", mensaje: "Intenta con un nuevo correo" });
    }
    if (user.image.public_id===imgDefaultPID){
      if (req.files?.image) {
        const result = await subirFoto(req.files.image.tempFilePath);
        await fsxt.remove(req.files.image.tempFilePath);
        image = {
          public_id: result.public_id,
          url: result.url
        }
      } else {
        image = {
          public_id: imgDefaultPID,
          url: imgDefaultUrl
        }
      }
    }else{
      await eliminarFotoOIMG(user.image.public_id);
      if (req.files?.image) {
        const result = await subirFoto(req.files.image.tempFilePath);
        await fsxt.remove(req.files.image.tempFilePath);
        image = {
          public_id: result.public_id,
          url: result.url
        }
      } else {
        image = {
          public_id: imgDefaultPID,
          url: imgDefaultUrl
        }
      }
    }
    const pass = newUser.password ? newUser.password : "pass";
    const comparacion = await comparar(pass, user.password);
    if (newUser.password && !comparacion){
      const hashPass = await encriptar(newUser.password);
      newUser.password=hashPass;
    }else{
      newUser.password=user.password;
    }
    newUser.image=image;
    user = await User.findByIdAndUpdate(user._id, { $set: newUser }, { new: true });

    return res.status(200).json({ ok: true, mensaje: "Tu perfil se ha actualizado", user });
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde."
    });
  }
}

export const elimUser = async (req, res) => {
  const { uid } = req;
  try {
    let user = await User.findById(uid);
    if (!user) return res.status(403).json({ error: "Sesion desconocida", mensaje: "Emos decidido banear tu cuenta, ya no puedes ingresar" });
    await User.findByIdAndRemove(user._id);
    return res.status(200).json({ ok: true, mensaje: "Tu usuario se a eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde."
    });
  }
}

export const refreshSesion = async (req, res) => {
  try {
    const { token, caducidad } = generarToken(req.uid);
    return res.json({ ok: true, token, caducidad });
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde."
    });
  }
}

export const logout = async (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ ok: true, mensaje: "Sesión terminada" });
}