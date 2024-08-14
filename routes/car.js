import {getCars, getCar, createCar, updateCar, deleteCar} from "../controllers/car.controller.js";
import express from 'express'
import upload from "../middleware/multer.js";
import {validateCar, validationHandler} from '../validators/carValidator.js'
import validateImage from "../validators/imageValidator.js";
import authenticate from "../middleware/authentication.js";

const carsRouter = express.Router()

carsRouter.get('/', getCars)

carsRouter.get('/:id', getCar)

carsRouter.post('/', authenticate([1]), upload.single('image'), validateCar(),validationHandler,validateImage, createCar)

carsRouter.put('/:id',authenticate([1]),  upload.single('image'), validateCar(), validationHandler, validateImage, updateCar)

carsRouter.delete('/:id',authenticate([1]), deleteCar)


export default carsRouter