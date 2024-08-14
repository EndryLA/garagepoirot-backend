import express from "express";
import { getImage, updateImage, uploadImage } from "../controllers/image.controller.js";
import upload from "../middleware/multer.js";
import validateImage from "../validators/imageValidator.js";

const imagesRouter = express.Router()

imagesRouter.post('/upload',upload.single('image'),validateImage, uploadImage)
imagesRouter.get('/download/:id',getImage)
imagesRouter.put('/upload/:id',upload.single('image'), validateImage, updateImage)

export default imagesRouter