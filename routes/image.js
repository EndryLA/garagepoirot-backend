import express from "express";
import { getImage, updateImage, uploadImage } from "../controllers/image.controller.js";
import upload from "../middleware/multer.js";
import validateImage from "../validators/imageValidator.js";
import authenticate from "../middleware/authentication.js";

const imagesRouter = express.Router()

imagesRouter.post('/upload',authenticate([1]), upload.single('image'),validateImage, uploadImage)
imagesRouter.get('/download/:id',getImage)
imagesRouter.put('/upload/:id',authenticate([1]), upload.single('image'), validateImage, updateImage)

export default imagesRouter