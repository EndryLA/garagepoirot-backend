import express from 'express'
import getUsers, { createUser, deleteUser, getUser, updateUser } from '../controllers/user.controller.js'
import upload from '../middleware/multer.js'
import {validateUser, validationHandler} from '../validators/userValidator.js'

const userRouter = express.Router()

userRouter.get('/',getUsers)
userRouter.get('/:id',getUser)
userRouter.post('/', upload.none(), validateUser(), validationHandler, createUser)
userRouter.put('/:id', upload.none(), validateUser(), validationHandler,updateUser)
userRouter.delete('/:id',deleteUser)

export default userRouter