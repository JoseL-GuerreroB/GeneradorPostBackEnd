import {Router} from 'express';
import { deletePost, getPosts, postPost, putPost } from '../controllers/post.controller.js';
import { requiereToken } from '../middlewares/jwtValidator.js';

const crudPost = Router();

crudPost.get('/misPost', requiereToken, getPosts);
crudPost.post('/newPost', requiereToken, postPost);
crudPost.put('/editPost/:id', requiereToken, putPost);
crudPost.delete('/elimPost/:id', requiereToken, deletePost);

export default crudPost;