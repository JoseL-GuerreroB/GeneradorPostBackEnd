import { Router } from "express";
import { body } from "express-validator";
import { deleteUsuario, getUsuario, getUsuarios, PostUsuario, PutUsuario,  } from "../controllers/user.controllers.js";
const ruta = Router();

// Rutas Crud

ruta.get("/users", getUsuarios);

ruta.get("/user/:id", getUsuario);

ruta.post("/user",[
  body("nombre", "Ingresa un nombre, este campo es obligatorio").trim().notEmpty().escape(),
  body("correo", "Escribe un correo valido").trim().isEmail().normalizeEmail(),
  body("contrasena", "Escribe una contraseña con una longitud mayor a 8 caracteres").trim().isLength({min: 9}).escape().custom((value,{req}) => {
    if (value !== req.body.contrasena2) {
      throw new Error("No coinciden las contraseñas");
    }else {
      return value;
    }
  })
], PostUsuario);

ruta.delete("/user/:id", deleteUsuario);

ruta.put("/user/:id",[
  body("nombre", "Ingresa un nombre, este campo es obligatorio").trim().notEmpty().escape(),
  body("correo", "Escribe un correo valido").trim().isEmail().normalizeEmail(),
  body("contrasena", "Escribe una contraseña con una longitud mayor a 8 caracteres").trim().isLength({min: 9}).escape().custom((value,{req}) => {
    if (value !== req.body.contrasena2) {
      throw new Error("No coinciden las contraseñas");
    }else {
      return value;
    }
  })
], PutUsuario);

// Rutas de Sesion

ruta.post("login")

export default ruta;