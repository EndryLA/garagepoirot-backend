import express from 'express'
import {getComments,  getComment, createComment, deleteComment} from '../controllers/comment.controller.js'
import {validateComment, validationHandler} from '../validators/commentValidator.js'
import upload from '../middleware/multer.js'
import authenticate from '../middleware/authentication.js'

const commentsRouter = express.Router()

commentsRouter.get('/:id',getComment)
commentsRouter.get('/',getComments)
commentsRouter.post('/', upload.none(), validateComment(), validationHandler ,createComment)
commentsRouter.delete('/:id',authenticate([1]), deleteComment)

export default commentsRouter