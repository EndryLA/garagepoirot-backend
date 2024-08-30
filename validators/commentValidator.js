import {body, validationResult} from 'express-validator'

export const validateComment = () => [
    body('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Veuillez saisir un nom'),

    body('note')
    .toInt()
    .isInt({min:1, max:5})
    .withMessage('La notre doit être comprise entre 1 et 5'),

    body('comment')
    .trim()
    .notEmpty()
    .isLength({min:10})
    .withMessage('Le commentaire doit faire au moins 10 charactères')
    .isLength({max:300})
    .withMessage('Le commentaire ne doit pas dépasser 300 charactères')
    
]

export const validationHandler = async (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()})
    }
    next()
}

export default validateComment