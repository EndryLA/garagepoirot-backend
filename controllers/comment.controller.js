import database from '../database/connect.js'

export const getComments = async (req,res) => {
    try {
        const query = 'SELECT * FROM comment'
        database.query(query, (error,results) => {
            if (error) {
                res.status(400).json({message: error.message})
            }
            if (results.length === 0){
                res.status(200).json({message: "Il n'y a aucun commentaire en base de données"})
            } else {
                 res.status(200).send(results)
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export  const getComment = async (req,res) => {
    try {
        const {id} = req.params
        const query = 'SELECT * FROM comment WHERE id = ?'
        database.query(query, [id], (error,result) => {
            if (error) {
                res.status(400).json({message :error.message})
            } if (result.length === 0 ) {
                res.status(404).json({message: "Le commentaire demandé n'existe pas"})
            } else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const createComment = async (req,res) => {
    try {
        const {name, note, comment} = req.body
        const query = 'INSERT INTO `comment`(name, note, comment) VALUES (?,?,?)'
        database.query(query, [name,note,comment], (error,results) => {
            if (error) {
                res.status(400).json({message : error.message})
            } else {
                const newCommentId = results.insertId
                res.status(201).json({
                    "message":"Le commentaire a bien été enregistré",
                    "serviceUrl":`/api/comments/${newCommentId}`
                })
            }
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const deleteComment = async (req,res) => {
    const {id} = req.params
    const query = 'DELETE FROM `comment` WHERE id = ?'
    database.query(query,[id], (error, results) => {
        if (error) {
            res.status(400).json({message : error.message})
        } if (results.affectedRows === 0) {
            res.status(404).json({message : "Le commentaire demandé n'existe pas"})
        } else {
            res.status(200).json({message: "Le commentaire a bien été supprimé"})
        }
    })
}

export const getCommentsByRating = async (req,res) => {
    try {
        const note = parseInt(req.params.note, 10);
        const query = "SELECT * FROM `comment` WHERE `note` >= ?"

        if (isNaN(note)) {
            return res.status(400).json({ message: "Invalid rating value" });
        }
        database.query(query,[note],(error, results) => {
            if (error) {
                res.status(400).json({message: error.message})
            } if (results.length === 0 ) {
                res.status(404).json({message: "Il n'y a pas de commentaires avec cette note"})
            } else {
                res.status(200).send(results)
            }
        })

    } catch (error) {
        res.status(500).json(error)
    }
}


export default getComments  