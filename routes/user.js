import express from 'express'
import getUsers, { createUser, deleteUser, getUser, updateUser, loginUser } from '../controllers/user.controller.js'
import upload from '../middleware/multer.js'
import {validateUser, validationHandler} from '../validators/userValidator.js'
import { authenticate } from '../middleware/authentication.js'

const userRouter = express.Router()

userRouter.get('/',authenticate([1]),getUsers)

userRouter.get('/:id',authenticate([1]),getUser)

userRouter.post('/register', upload.none(), validateUser(), validationHandler, createUser)

userRouter.post('/login',upload.none(),loginUser)

userRouter.put('/:id', upload.none(), validateUser(), validationHandler ,authenticate([1]), updateUser)

userRouter.delete('/:id', authenticate([1]), deleteUser)

export default userRouter