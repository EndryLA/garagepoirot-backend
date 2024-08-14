import database from "../database/connect.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export const getUsers = async (req,res) => {
    try {

    const query = "SELECT user.id, firstname, lastname, username, role FROM user JOIN role ON user.roleId = role.id"
    database.query(query,(error, results) =>{
        if (error) {
            res.status(400).json({message: error.message})
        } if (results.length === 0) {
            res.status(200).json({message: "Il n'y pas d'utilisateurs enregistrés"})
        } else {
            res.status(200).send(results)
        }
    } )
    } catch(error) {
        res.status(500).json({message: error.message})
    }

}

export const getUser = async (req,res) => {
    try {
        const {id} = req.params
        const query = "SELECT user.id, firstname, lastname, username, role FROM user JOIN role ON user.roleId = role.id WHERE user.id = ?"
        database.query(query,[id],(error, result) => {
            if (error) {
                res.status(400).json({message: error.message})
            } if (result.length === 0) {
                res.status(404).json({message: "L'utilisateur demandé n'existe pas"})
            } else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createUser = async (req,res) => {
    try {
        const {firstname, lastname, username, password, roleId} = req.body
        const saltRounds = 10;
        console.log(req.body)
        const checkUserQuery = "SELECT * FROM user WHERE username = ?"

        database.query(checkUserQuery, [username], async (errors, result) => {
            if (errors) {
                return res.status(400).json({message : errors.message})
            }
            if (result.length > 0) {
                console.log(result)
                return res.status(409).json({message : "Cette adresse mail est déjà utilisée"})
            }
            const hashedPassword = await bcrypt.hash(password,saltRounds)

            const query = 'INSERT INTO user (firstname,lastname,username,password,roleId) VALUES (?,?,?,?,?)'
            database.query(query, [firstname, lastname, username, hashedPassword, roleId], (error,result) => {
                if (error) {
                    return res.status(400).json({message: error.message})
                } else {
                    return res.status(201).json({
                        "message": "Le nouvel utilisitauer a bien été enregistré",
                        "newUserUrl": `/api/users/${result.insertId}`
                    })
                }
            })
        })

        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req,res) => {
    try {
        const {id} = req.params
        const {firstname, lastname, username, password, roleId} = req.body
        const query = 'UPDATE user Set firstname = ?, lastname = ?, username = ?, password = ?, roleId = ? WHERE id = ?'
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        database.query(query,[firstname,lastname, username,hashedPassword,roleId,id], (error, result) => {
            if (error) {
                res.status(400).json({message: error.message})
            } if (result.affectedRows === 0) {
                res.status(404).json({message: "L'utilisteur demandé n'existe pas"})
            } else {
                res.status(200).json({message: "L'utilisateur a bien été modifié"})
            }
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteUser = async (req,res) => {
    try {
        const {id} = req.params
        const query = 'DELETE FROM user WHERE id = ?'
        database.query(query, [id], (error,result) => {
            if (error) {
                res.status(400).json({message: error.message})
            } if (result.affectedRows === 0) {
                res.status(404).json({message:"L'utilisateur demandé n'existe pas"})
            } else {
                res.status(200).json({message: "L'utilisateur a bien été supprimé"})
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const loginUser = async (req,res) => {
    const {username, password} = req.body
    const checkMailQuery = "SELECT * FROM user WHERE username = ?"

    database.query(checkMailQuery,[username], async (error,result) => {
        console.log(result)

        if (error) {
            res.status(500).json({message: error.message})
        }

        if (result.length === 0) {
            return res.status(400).json({message: "Adresse mail ou mot de passe invalide"})
        }
        const user = result[0]

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            res.status(400).json({message: "Adresse mail ou mot de passe invalide"})
        }

        const token = jwt.sign(
            {id:user.id, username: user.username, role: user.roleId},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '24h'}
        )
        
        res.status(200).json({token})
    })
}



export default getUsers