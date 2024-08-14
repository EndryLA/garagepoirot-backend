import express from 'express'
import {getServices, getService, createService, updateService, deleteService} from '../controllers/service.controller.js'
import {validateService, validationHandler} from '../validators/serviceValidator.js'
import upload from '../middleware/multer.js'

const servicesRouter = express.Router()

/* 
upload.none(): This middleware will parse multipart/form-data that contains only text fields (no files).
It populates req.body so that express-validator can validate the data as usual.
*/

servicesRouter.get('/',getServices)
servicesRouter.get('/:id',getService)
servicesRouter.post('/',upload.none(),validateService(), validationHandler, createService)
servicesRouter.put('/:id',upload.none(),validateService(), validationHandler,updateService)
servicesRouter.delete('/:id',deleteService)



export default servicesRouter