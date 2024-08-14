import express from 'express'
import { createSchedule, getSchedules, getSchedule, updateSchedule, deleteSchedule } from '../controllers/schedule.controller.js'
import { validateSchedule, validationHandler } from '../validators/scheduleValidator.js'
import upload from '../middleware/multer.js'

const schedulesRouter = express.Router()

schedulesRouter.get('/',getSchedules)
schedulesRouter.get('/:day',getSchedule)
schedulesRouter.post('/',upload.none(), validateSchedule(), validationHandler, createSchedule)
schedulesRouter.put('/:id', upload.none(), validateSchedule(), validationHandler, updateSchedule)
schedulesRouter.delete('/:id',deleteSchedule)

export default schedulesRouter
