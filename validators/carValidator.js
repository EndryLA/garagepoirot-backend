import {body, validationResult } from 'express-validator'

export const validateCar = () => [
    body('price')
    .trim()
    .escape()
    .notEmpty().withMessage("Veuillez renseigner le prix")
    .isInt().withMessage("Le prix doit être un nombre"),

    body('kilometers')
    .trim()
    .escape()
    .notEmpty().withMessage("Veuillez renseigner le kilométrage du véhicule")
    .isNumeric().withMessage("Le kilomètrage doit être un nombre"),

    body("circulationYear")
    .trim()
    .escape()
    .notEmpty().withMessage("Veuillez renseigner l'année de circulation")
    .isNumeric().withMessage("L'année de circulation doit être un nombre"),

    body('fuel')
    .trim()
    .escape()
    .notEmpty().withMessage("Veuillez renseigner le type de combustible"),

    body("gearbox")
    .trim()
    .escape()
    .notEmpty().withMessage("Veuillez renseigner le type de boîte de vitesse"),

    body("model")
    .trim()
    .escape()
    .notEmpty().withMessage("Veuillez spécifier le modèle du véhicule")
]

export const validationHandler = async (req,res,next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}

export default validateCar