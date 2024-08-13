import database from "../database/connect.js";

export const getSchedules = async (req,res) => {
    try {

        const query = 'SELECT * FROM `schedule`'
        
        database.query(query,(error,results) => {
            if (error) {
                res.status(400).json({message: error.message})
            } 
            res.status(200).send(results)
        })
    } catch(error) {
        res.status(500).json({message : error.message})
    }
}

export const getSchedule = async (req,res) => {
    try {
        const {day} = req.params
        const query = 'SELECT content FROM schedule WHERE day = ?'
        database.query(query,[day], (error, result) => {
            if (error) {
                res.status(400).json({message : error.message})
            }
            res.status(200).send(result)
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const createSchedule = async (req,res) => {
    try {
        const {day,content} = req.body
        const query = 'INSERT INTO `schedule`(day,content) VALUES(?,?)'
        database.query(query,[day,content], (error,results) => {
            if (error) {
                res.status(400).json({message: error.message})
            }
            const newSchedule = results.insertId

            res.status(201).json({
                "message":"L'emploi du temps a bien été enregistré",
                "serviceUrl":`/api/schedules/${newSchedule}`
            })
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateSchedule = async (req,res) => {
    try {
        const {id} = req.params
        const {day,content} = req.body
        const query = 'UPDATE `schedule` SET day = ?, content = ? WHERE id = ?'
        database.query(query,[day,content,id], (error,result) => {
            if (error) {
                res.status(400).json({message: error.message})
            } if (result.affectedRows === 0) {
                res.status(404).json({message:'Emploi du temps non trouvé'})
            } else {
                res.status(200).json({message: "L'emploi du temps a bien été modifié"})
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteSchedule = async (req,res) => {
    try {

    const {id} = req.params
    const query = "DELETE FROM `schedule` WHERE id = ?"
    database.query(query, [id], (error,result) => {
        if (error) {
            res.status(400).json({message: error.message})
        } if (result.affectedRows === 0) {
            res.status(404).json({message: "Emploi du temps non trouvé"})
        } else {
            res.status(200).json({message: "L'emploi du temps a bien été supprimé"})
        }
    })
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

export default getSchedules