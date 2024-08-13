import express from "express";
import { getImage, updateImage, uploadImage } from "../controllers/image.controller.js";
import upload from "../middleware/multer.js";

const imagesRouter = express.Router()

imagesRouter.post('/upload',upload.single('image'),uploadImage)
imagesRouter.get('/download/:id',getImage)
imagesRouter.put('/upload/:id',upload.single('image'),updateImage)

export default imagesRouter