import database from "../database/connect.js";

export const getCars = async (req,res) => {
    try {
        const query = "SELECT * FROM car"
        database.query(query, (error, results) => {
            if (error) {
                res.status(400).json({message: error.message})
            }
            if (results.length === 0) {
                res.status(404).json({message: "La voiture demandée n'existe pas"})
            }
            else {
                res.status(200).send(results)
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getCar = async (req,res) => {
    try {
        const {id} = req.params
        const query = "SELECT * FROM car WHERE car.id = ?"
        database.query(query, [id], (error,result) => {
            if (error) {
                res.status(400).json({message: error.message})
            }
            if (result.length === 0) {
                res.status(404).json({message: "La voiture demandée n'existe pas"})
            }
            else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const createCar = async (req, res) => {
    try {
        const { price, circulationYear, model, fuel, gearbox, kilometers } = req.body;
        const { originalname, buffer } = req.file;
        const imageQuery = "INSERT INTO image (filename, imageData) VALUES (?, ?)";

        database.query(imageQuery, [originalname, buffer], (imageError, imageResult) => {
            if (imageError) {
                return res.status(400).json({ message: imageError.message });
            }

            const imageId = imageResult.insertId;

            const carQuery = "INSERT INTO car (price, circulationYear, model, fuel, gearbox, kilometers, imageId) VALUES (?, ?, ?, ?, ?, ?, ?)";
            database.query(carQuery, [price, circulationYear, model, fuel, gearbox, kilometers, imageId], (carError, carResult) => {
                if (carError) {
                    return res.status(400).json({ message: "Database Error : " + carError});
                } else {
                    res.status(201).json({
                        message: 'La voiture a été créée avec succès',
                        carUrl: `/api/cars/${carResult.insertId}`,
                    });
                }

                
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { price, circulationYear, model, fuel, gearbox, kilometers, imageId } = req.body;

        if (req.file) {
            const { originalname, buffer } = req.file;

            const getImageIdQuery = "SELECT imageId FROM car WHERE id = ?";
            database.query(getImageIdQuery, [id], (imageIdError, imageIdResult) => {
                if (imageIdError) {
                    return res.status(400).json({ message: imageIdError.message });
                }
                if (imageIdResult.length === 0) {
                    return res.status(404).json({ message: "La voiture demandée n'existe pas" });
                }

                const imageId = imageIdResult[0].imageId;

                const updateImageQuery = "UPDATE image SET filename = ?, imageData = ? WHERE id = ?";
                database.query(updateImageQuery, [originalname, buffer, imageId], (imageError, imageResult) => {
                    if (imageError) {
                        return res.status(400).json({ message: imageError.message });
                    }

                    const updateCarQuery = "UPDATE car SET price = ?, circulationYear = ?, model = ?, fuel = ?, gearbox = ?, kilometers = ?, imageId = ? WHERE id = ?";
                    database.query(updateCarQuery, [price, circulationYear, model, fuel, gearbox, kilometers,imageId, id], (carError, carResult) => {
                        if (carError) {
                            return res.status(400).json({ message: carError.message });
                        }

                        res.status(200).json({
                            message: "La voiture bien été mise à jour",
                        });
                    });
                });
            });
        } else {
            const updateCarQuery = "UPDATE car SET price = ?, circulationYear = ?, model = ?, fuel = ?, gearbox = ?, kilometers = ? WHERE id = ?";
            database.query(updateCarQuery, [price, circulationYear, model, fuel, gearbox, kilometers, id], (carError, carResult) => {
                if (carError) {
                    return res.status(400).json({ message: carError.message });
                }

                res.status(200).json({
                    message: "La voiture bien été mise à jour",
                    carId: id,
                });
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;

        const getImageIdQuery = "SELECT imageId FROM car WHERE id = ?";
        database.query(getImageIdQuery, [id], (imageIdError, imageIdResult) => {
            if (imageIdError) {
                return res.status(400).json({ message: imageIdError.message });
            }
            if (imageIdResult.length === 0) {
                return res.status(404).json({ message: "La voiture demandée n'existe pas" });
            }

            const imageId = imageIdResult[0].imageId;

            // Delete the car from the car table
            const deleteCarQuery = "DELETE FROM car WHERE id = ?";
            database.query(deleteCarQuery, [id], (carError, carResult) => {
                if (carError) {
                    return res.status(400).json({ message: carError.message });
                }

                // Delete the image from the image table
                const deleteImageQuery = "DELETE FROM image WHERE id = ?";
                database.query(deleteImageQuery, [imageId], (imageError, imageResult) => {
                    if (imageError) {
                        return res.status(400).json({ message: imageError.message });
                    }

                    res.status(200).json({
                        message: "La voiture a bien été supprimée",
                    });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default getCars  