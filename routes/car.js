import {getCars, getCar, createCar, updateCar, deleteCar} from "../controllers/car.controller.js";
import express from 'express'
import upload from "../middleware/multer.js";
import {validateCar, validationHandler} from '../validators/carValidator.js'
import validateImage from "../validators/imageValidator.js";

const carsRouter = express.Router()

carsRouter.get('/', getCars)
carsRouter.get('/:id', getCar)
carsRouter.post('/', upload.single('image'), validateCar(),validationHandler,validateImage, createCar)
carsRouter.put('/:id', upload.single('image'), validateCar(), validationHandler, validateImage, updateCar)
carsRouter.delete('/:id',deleteCar)


export default carsRouter