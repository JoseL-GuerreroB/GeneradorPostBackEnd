import { Router } from "express";
import { editUser, elimUser, login, logout, refreshSesion, register, sesion } from "../controllers/auth.controller.js";
import { editUserVal, loginVal, registerVal } from "../middlewares/expValidator.js";
import { requiereRefToken, requiereToken } from "../middlewares/jwtValidator.js";

const rutasAuth = Router();

rutasAuth.post('/register', registerVal, register);
rutasAuth.post('/login', loginVal, login);

rutasAuth.get('/sesion', requiereToken, sesion);
rutasAuth.get('/presesion', requiereRefToken, refreshSesion);
rutasAuth.get('/logout', requiereToken, logout)

rutasAuth.put('/editUser', requiereToken, editUserVal, editUser);
rutasAuth.delete('/elimUser', requiereToken, elimUser);

export default rutasAuth;