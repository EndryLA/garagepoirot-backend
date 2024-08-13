import express from 'express'
import {getComments,  getComment, createComment, deleteComment} from '../controllers/comment.controller.js'

const commentsRouter = express.Router()

commentsRouter.get('/',getComments)
commentsRouter.get('/:id',getComment)
commentsRouter.post('/',createComment)
commentsRouter.delete('/:id',deleteComment)

export default commentsRouter