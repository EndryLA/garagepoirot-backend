import express from 'express'
import {getServices, getService, createService, updateService, deleteService} from '../controllers/service.controller.js'
import {validateService, validationHandler} from '../validators/serviceValidator.js'
import upload from '../middleware/multer.js'
import authenticate from '../middleware/authentication.js'

const servicesRouter = express.Router()

/* 
upload.none(): This middleware will parse multipart/form-data that contains only text fields (no files).
It populates req.body so that express-validator can validate the data as usual.
*/

servicesRouter.get('/',getServices)
servicesRouter.get('/:id',getService)
servicesRouter.post('/',authenticate([1]), upload.none(),validateService(), validationHandler, createService)
servicesRouter.put('/:id',authenticate([1]), upload.none(),validateService(), validationHandler,updateService)
servicesRouter.delete('/:id',authenticate([1]), deleteService)



export default servicesRouter