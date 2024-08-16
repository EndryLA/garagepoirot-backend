import express from 'express'
import sendMail from '../controllers/mailer.controller.js'
import upload from '../middleware/multer.js'
import {validateMail, validationHandler} from '../validators/mailValidator.js'

const mailerRouter = express.Router()

mailerRouter.post('/send',upload.none(), validateMail(), validationHandler, sendMail)


export default mailerRouter