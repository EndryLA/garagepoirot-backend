import {body, validationResult} from 'express-validator'

export const validateUser = () => [
    body('username')
    .trim()
    .isEmail()
    .withMessage('Veuillez saisir une adresse mail valide')
    .normalizeEmail(),

    body('password')
    .trim()
    .isLength({min:8})
    .withMessage("Le mot de passe doit contenir au moins 8 charactères")
    .matches(/[A-Z]/)
    .withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Le mot de passe doit contenir au moins un chractère spécial")
    .matches(/\d/)
    .withMessage('Le mot de passe doit contenir au moins un chiffre'),

    body('firstname')
    .trim()
    .notEmpty()
    .withMessage('Veuillez saisir un prénom')
    .isAlpha()
    .withMessage("Le prénom ne peut contenir que des lettres"),

    body('lastname')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Veuillez saisir un nom')
    .isAlpha()
    .withMessage('Le nom ne peut contenir que des lettres'),

]

export const validationHandler = async (req,res,next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()})
    }
    next()
}

export default validateUser