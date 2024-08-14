import express from 'express'
import { createSchedule, getSchedules, getSchedule, updateSchedule, deleteSchedule } from '../controllers/schedule.controller.js'
import { validateSchedule, validationHandler } from '../validators/scheduleValidator.js'
import upload from '../middleware/multer.js'
import authenticate from '../middleware/authentication.js'

const schedulesRouter = express.Router()

schedulesRouter.get('/',getSchedules)
schedulesRouter.get('/:day',getSchedule)
schedulesRouter.post('/',authenticate([1]), upload.none(), validateSchedule(), validationHandler, createSchedule)
schedulesRouter.put('/:id',authenticate([1]), upload.none(), validateSchedule(), validationHandler, updateSchedule)
schedulesRouter.delete('/:id',authenticate([1]), deleteSchedule)

export default schedulesRouter
