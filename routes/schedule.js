import express from 'express'
import { createSchedule, getSchedules, getSchedule, updateSchedule, deleteSchedule } from '../controllers/schedule.controller.js'

const schedulesRouter = express.Router()

schedulesRouter.get('/',getSchedules)
schedulesRouter.get('/:day',getSchedule)
schedulesRouter.post('/',createSchedule)
schedulesRouter.put('/:id',updateSchedule)
schedulesRouter.delete('/:id',deleteSchedule)

export default schedulesRouter
