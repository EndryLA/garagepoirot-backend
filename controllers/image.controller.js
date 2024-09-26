import database from "../database/connect.js";

export const uploadImage = async (req, res) => {
    try {
        const { originalname, buffer } = req.file;
        console.log(req.file);

        const query = "INSERT INTO image (filename, imageData) VALUES (?, ?)";

        database.query(query, [originalname, buffer], (error, result) => {
            if (error) {
                return res.status(400).json({ error });
            } 
            
            res.status(201).json({
                message: "L'image a bien été enregistrée",
                imageUrl: `/api/images/download/${result.insertId}`,
                imageId: `${result.insertId}`
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getImage = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "SELECT imageData FROM image WHERE id = ?";

        database.query(query, [id], (error, results) => {
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            
            if (results.length === 0) {
                return res.status(404).json({ message: "L'image demandée n'existe pas" });
            }

            res.setHeader('Content-Type', 'image/jpeg');
            res.send(results[0].imageData);
        });
    } catch (error) {
        console.error('Unexpected Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const updateImage = async(req,res) => {
    try {
        const {id} = req.params
        const {originalname, buffer} = req.file
        const query = 'UPDATE image SET filename = ?, imageData = ? WHERE id = ?'
        database.query(query,[originalname,buffer,id], (error,result) => {
            if (error) {
                res.status(400).json({message: error.message})
            } 
            if(result.affectedRows === 0) {
                res.status(404).json({message:"L'image demandé n'existe pas"})
            }
            else {
                res.status(200).json({message :"L'image a bien été modifiée"})
            }
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 


export default uploadImage;
