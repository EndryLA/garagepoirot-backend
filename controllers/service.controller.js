import database from '../database/connect.js'

export const getServices = async (req,res) => {
    try {
        const query = 'SELECT * FROM `service`'
        database.query(query, (error, results) => {

            if (error) {
                res.status(500).json({message : error.message})
            } 
            
            if (results.length === 0 ) {
                res.status(200).json({message : "Il n'y a aucun service à afficher"})
            } 
            
            else {
                res.status(200).send(results)
            }
        })

    } catch(error) {
        res.status(500).json({message : error.message})
    }
}

export const getService = async (req,res) => {
    try {
        const {id} = req.params
        const query = "SELECT * FROM `service` WHERE `id` = ?"

        database.query(query, [id] ,(error, results) => {

            if (error) {
                res.status(400).json({message : error.message})
            } 

            if (results.length === 0) {
                res.status(404).json({message: "Le service demandé n'existe pas"})
            }

            else {
                res.status(200).send(results)
            }

        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


export const createService = async (req,res) => {
    try {
        const {title,description} = req.body
        const query = 'INSERT INTO service(`title`,`description`) VALUES(?,?)'

        database.query(query, [title, description], (error, results) => {

            if (error) {
                res.status(400).json({message: error.message})
            }

            const newServiceId = results.insertId
            res.status(201).json({
                "message":"Le service a bien été enregistré",
                "serviceUrl":`/api/services/${newServiceId}`
            })
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateService = async (req,res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body

        const query = 'UPDATE service SET title = ?, description = ? WHERE id = ?'

        database.query(query, [title,description,id], (error, results) => {

            if (error) {
                res.status(400).json({message: error.message})
            } 

            res.status(200).json({message:"Le service a bien été modifié"})
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteService = async (req,res) => {
    try {
        const {id} = req.params
        const query = 'DELETE FROM service WHERE id = ?'

        database.query(query, [id], (error, results) => {

            if (error) {
                res.status(400).json({message: error.message})
            } 
            
            if (results.affectedRows === 0) {
                res.status(404).json({message : "Le service que vous souhaitez supprimer n'exite pas"})
            }
            
            else {
                res.status(200).json({message: 'Le service a bien été supprimé'})
            }
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export default getServices