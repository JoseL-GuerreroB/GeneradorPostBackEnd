import {body} from 'express-validator';
import valRes from './expValidatorRes.js';

export const registerVal = [
  body("name", "Ingresa un nombre de usuario valido").trim().notEmpty().isLength({min: 3}).escape(),
  body("email", "Ingresa un correo electronico con su debida estructura").trim().isEmail().escape(),
  body("terms", "Debes aceptar los terminos y condiciones").custom(value => {
    if (value!=="true") throw new Error("No aceptaste los terminos y condiciones");
    return value;
  }),
  body("password", "Ingresa una contraseña con un minimo de 8 caracteres").trim().isLength({min: 8}).custom((value, {req})=>{
    if (value!==req.body.repassword) throw new Error("No coinciden las contraseñas");
    return value;
  }),
  valRes
];

export const editUserVal = [
  body("name", "Ingresa un nombre de usuario valido").trim().notEmpty().isLength({min: 3}).escape(),
  body("email", "Ingresa un correo electronico con su debida estructura").trim().isEmail().escape(),
  body("password", "Ingresa una contraseña con un minimo de 8 caracteres").trim().isLength({ min: 8 }).custom((value, { req }) => {
    if (value !== req.body.repassword) throw new Error("No coinciden las contraseñas");
    return value;
  }),
  valRes
];


export const loginVal = [
  body("email", "Ingresa un correo electronico con su debida estructura").trim().isEmail().escape(),
  body("password", "Ingresa una contraseña con un minimo de 8 caracteres").trim().isLength({ min: 8 }),
  valRes
]