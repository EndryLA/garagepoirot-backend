import {body, validationResult} from 'express-validator'

export const validateService = () => [
    body('title')
    .trim()
    .notEmpty()
    .withMessage("Le titre est obligatoire"),
    body('description')
    .trim()
    .notEmpty()
    .withMessage('La description est obligatoire')
]

export const validationHandler = async (req,res,next) => {
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}

export default validateService