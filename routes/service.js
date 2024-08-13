import express from 'express'
import {getServices, getService, createService, updateService, deleteService} from '../controllers/service.controller.js'

const servicesRouter = express.Router()


servicesRouter.get('/',getServices)
servicesRouter.get('/:id',getService)
servicesRouter.post('/',createService)
servicesRouter.put('/:id',updateService)
servicesRouter.delete('/:id',deleteService)



export default servicesRouter