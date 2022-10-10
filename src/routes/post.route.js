import {Router} from 'express';
import { deletePost, getPost, getPosts, postPost, putPost } from '../controllers/post.controller.js';
import { requiereToken } from '../middlewares/jwtValidator.js';

const crudPost = Router();

crudPost.get('/misPost', requiereToken, getPosts);
crudPost.get('/miPost/:id', requiereToken, getPost);
crudPost.post('/newPost', requiereToken, postPost);
crudPost.put('/editPost/:id', requiereToken, putPost);
crudPost.delete('/elimPost/:id', requiereToken, deletePost);

export default crudPost;