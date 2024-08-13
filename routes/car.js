import {getCars, getCar, createCar, updateCar, deleteCar} from "../controllers/car.controller.js";
import express from 'express'
import upload from "../middleware/multer.js";

const carsRouter = express.Router()

carsRouter.get('/', getCars)
carsRouter.get('/:id', getCar)
carsRouter.post('/', upload.single('image'),createCar)
carsRouter.put('/:id', upload.single('image'),updateCar)
carsRouter.delete('/:id',deleteCar)


export default carsRouter