import express from "express";
import ruta from "./routes/user.routes.js";
import conectarDB from "./db.js";
import fileUpload from "express-fileupload";
import { Port } from "./config.js";
import cors from 'cors';

const app = express();
conectarDB();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './upload'
}))
app.use(express.urlencoded({extends: true}));

app.use("/", ruta);

app.listen(Port,()=> console.log("El servidor esta escuchando en el puerto: ",Port));
