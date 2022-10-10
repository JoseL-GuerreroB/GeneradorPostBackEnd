import express from 'express';
import cors from 'cors';
import { ORIGIN1, PORT } from './libs/config.js';
import conexionDB from './db.js';
import rutasAuth from './routes/auth.route.js';
import fileUpload from 'express-fileupload';
import crudPost from './routes/post.route.js';
import cookie from 'cookie-parser';

const app = express();
conexionDB();


const whiteList = [ORIGIN1];

app.use(cors({
  origin: function (origin, cb) {
    if (whiteList.includes(origin)) return cb(null, origin);
    return cb("Error de cors");
  },
  credentials: true
})
);

app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './upload'
}));
app.use(express.urlencoded({extended: true}));
app.use(cookie());

app.use('/auth', rutasAuth);
app.use('/app', crudPost);

app.listen(PORT, ()=> console.log("El servidor esta activo"));