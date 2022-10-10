import { eliminarFotoOIMG, subirIMG } from "../libs/cloudinary.js";
import Post from "../models/Post.js";
import fsxt2 from "fs-extra";
import { imgPostDefPID, imgPostDefUrl } from "../libs/config.js";

export const getPosts = async(req, res) => {
  try {
    const posts = await Post.find({uid: req.uid});
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Favor de intentarlo más tarde.",
    });
  }
}

export const getPost = async(req, res) => {
  const {id} = req.params;
  try {
    const post = await Post.findOne({ 
      $and: [
        { uid: req.uid }, {_id: id }
      ]
    });
    if (!post || post.length === 0) return res.status(403).json({ error: "Post no encontrado", mensaje: "El recurso es inexistente" })
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Favor de intentarlo más tarde.",
    });
  }
}

export const postPost = async(req, res) => {
  const spost = req.body;
  const {uid} = req;
  spost.uid = uid;
  try {
    if (req.files?.image){
      const result = await subirIMG(req.files.image.tempFilePath);
      await fsxt2.remove(req.files.image.tempFilePath);
      spost.image = {
        public_id: result.public_id,
        url: result.url
      }
    }
    const post = new Post(spost);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    
    console.log(error)
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Favor de intentarlo más tarde.",
    });
  }
}

export const putPost = async(req,res) => {
  const {id} = req.params;
  const spost = req.body;
  const { uid } = req;
  spost.uid = uid;
  try {
    let post = await Post.findOne({
      $and: [
        {_id: id}, {uid: spost.uid},
      ]
    });
    if(!post || post.length === 0) return res.status(403).json({error: "Post no encontrado", mensaje: "No puedes editar un recurso inexistente"});
    if(post.image.public_id === imgPostDefPID){
      if (req.files?.image) {
        const result = await subirIMG(req.files.image.tempFilePath);
        await fsxt2.remove(req.files.image.tempFilePath);
        spost.image = {
          public_id: result.public_id,
          url: result.url
        }
      } else {
        spost.image = {
          public_id: imgPostDefPID,
          url: imgPostDefUrl
        }
      }
    } else {
      if (req.files?.image) {
        await eliminarFotoOIMG(post.image.public_id);
        const result = await subirIMG(req.files.image.tempFilePath);
        await fsxt2.remove(req.files.image.tempFilePath);
        spost.image = {
          public_id: result.public_id,
          url: result.url
        }
      } else {
        spost.image = {
          public_id: post.image.public_id,
          url: post.image.url
        }
      }
    }
    const newPost = await Post.findByIdAndUpdate(post._id,{$set: spost}, {new: true});
    res.status(201).json({ok: true, mensaje: "El post se actualizo correctamente", newPost});
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Favor de intentarlo más tarde.",
    });
  }
}

export const deletePost = async (req,res) => {
  const { id } = req.params;
  const spost = req.body;
  const { uid } = req;
  spost.uid = uid;
  try {
    let post = await Post.findOne({
      $and: [
        { _id: id }, { uid: spost.uid },
      ]
    });
    if (!post || post.length === 0) return res.status(403).json({ error: "Post no encontrado", mensaje: "No puedes eliminar un recurso inexistente" });
    if (post.fav === true) return res.status(400).json({ error: "Post favorito", mensaje: "No puedes eliminar un post favorito" });
    await Post.findByIdAndRemove(id);
    return res.status(200).json({ok: true, mensaje: "Post eliminado"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Favor de intentarlo más tarde.",
    });
  }
}