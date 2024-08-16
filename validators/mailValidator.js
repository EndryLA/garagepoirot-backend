import {body, validationResult} from 'express-validator'

export const validateMail = () => [
    body('firstname')
    .trim()
    .escape()
    .notEmpty().withMessage('Veuillez saisir un prénom'),

    body('lastname')
    .trim()
    .escape()
    .notEmpty().withMessage('Veuillez saisir un nom'),

    body('email')
    .trim()
    .escape()
    .notEmpty()
    .isEmail().withMessage('Veuillez saisir une aresse mail valide')
    .normalizeEmail(),

    body('message')
    .trim()
    .escape()
    .notEmpty().withMessage('Veuillez saisir un message')
]

export const validationHandler = async (req,res,next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()})
    }
    next()
}

export default validateMail