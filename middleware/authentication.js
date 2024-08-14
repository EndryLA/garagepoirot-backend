import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const authenticate = (allowedRoles = []) => {
    return async (req,res,next) => {
        try {
            const token = req.header('Authorization').split(' ')[1]
    
            if (!token) {
                return res.status(401).json({message: "Accès refusé"})
            }
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.user = decoded
            console.log(allowedRoles)
            console.log(req.user.role)
    
            if (allowedRoles && !allowedRoles.includes(req.user.role)) {
                return res.status(403).json({message: "Accès refusé "})
            }
            next()
        }
        catch (error) {
            res.status(500).json({message: error.message})
        }

    }
}

export default authenticate