import User from "../models/user.models.js";
import { validationResult } from "express-validator";
import { encriptar } from "../libs/bcrypt.js";
import fs from "fs-extra";
import { eliminarFotoOIMG, subirFoto } from "../libs/cloudinary.js";

// Rutas Crud

export const PostUsuario= async(req,res) =>{ 
  try{
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.json(errores);
    }
    const {nombre, correo, contrasena} = req.body;
    let imagen;
    if (req.files?.imagen) {
      const result = await subirFoto(req.files.imagen.tempFilePath);
      await fs.remove(req.files.imagen.tempFilePath);
      imagen = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }
    const hashContrasena = await encriptar(contrasena);
    const user = new User({
      nombre,
      correo,
      contrasena: hashContrasena,
      imagen
    });
    await user.save();
    return res.json(user);
  }catch(error){
      console.error(error);
      res.status(500).send({mensaje: error.message});
  }
}

export const getUsuarios= async(req,res) =>{
  try{
    const users = await User.find();
      res.json(users);
  }catch(err){
      console.log(err);
      res.status(500).send('Hubo un error');
  }
}

export const deleteUsuario = async (req, res) => {
  try {
    const {id} = req.params;
    let user = await User.findById(id);
    if(!user) return res.json({mensaje: "el usuario que decea eliminar no existe"});
    user = await User.findByIdAndDelete(id);
    if (user.imagen.public_id) await eliminarFotoOIMG(newUser.imagen.public_id);
    console.log(user);
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send({mensaje: error.message});
  }
}

export const PutUsuario= async(req,res) =>{ 
  try{
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.json(errores);
    }
    const {id} = req.params;
    let newUser = await User.findById(id);
    if (!newUser) return res.json({ mensaje: "el usuario que decea editar no existe" });
    if (newUser.imagen.public_id) await eliminarFotoOIMG(newUser.imagen.public_id);
    // Busque por medio del id el documento requerido y por medio del valor de su public_id elimine la antigua imagen

    const {contrasena} = req.body;
    const hashContrasena = await encriptar(contrasena);
    req.body.contrasena = hashContrasena;
    if (req.files?.imagen) {
      const result = await subirFoto(req.files.imagen.tempFilePath);
      await fs.remove(req.files.imagen.tempFilePath);
      // Adiere la nueva imagen
      req.body.imagen = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    newUser = await User.findByIdAndUpdate(id,{$set:req.body},{new: true});
    return res.json(newUser);
  }catch(error){
      console.error(error);
    res.status(500).send({ mensaje: error.message });
  }
}

export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    if (!user) return res.json({ mensaje: "el usuario que decea editar no existe" });
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ mensaje: error.message });
  }
}

// Rutas sesion

export const login = async (req, res) => {
  try {
    const {correo, contrasena} = req.body;
    const user = await User.findOne({correo});
    if (!user) return res.json({mensaje: "tu correo no esta registrado" });

  } catch (error) {
    
  }
}