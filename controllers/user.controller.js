import database from "../database/connect.js";
import bcrypt from 'bcrypt'


export const getUsers = async (req,res) => {
    try {

    const query = "SELECT user.id, firstname, lastname, username, role FROM user JOIN role ON user.roleId = role.id"
    database.query(query,(error, results) =>{
        if (error) {
            res.status(400).json({message: error.message})
        } if (results.length === 0) {
            res.status(200).json({message: "Il n'y pas d'utilisateurs enregistré"})
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
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        const query = 'INSERT INTO user(firstname,lastname,username,password,roleId) VALUES (?,?,?,?,?)'
        database.query(query, [firstname, lastname, username, hashedPassword, roleId], (error,result) => {
            if (error) {
                res.status(400).json({message: error.message})
            } else {
                const newUserId = result.insertId
                res.status(201).json({
                    "message": "Le nouvel utilisitauer a bien été enregistré",
                    "newUserUrl": `/api/users/${newUserId}`
                })
            }
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
export default getUsers