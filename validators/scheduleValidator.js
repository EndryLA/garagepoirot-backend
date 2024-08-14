import {body, validationResult} from 'express-validator'

export const validateSchedule = () => [
    body('day')
    .trim()
    .notEmpty(),
    body('content')
    .trim()
    .notEmpty()
    .withMessage("Veuillez spécifier l'horaire")
]

export const validationHandler = async (req,res,next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()})
    }
    next()
}

export default validateSchedule