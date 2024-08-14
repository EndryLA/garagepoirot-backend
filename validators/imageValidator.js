export const validateImage = async (req,res,next) => {
    const validMimeTypes = ['image/jpg','image/jpeg', 'image/png', 'image/webp']
    console.log(req.file)

    if (!req.file && req.method === 'PUT') {
        return next()
    }

    if (!req.file && req.method === 'POST') {
        return res.status(400).json({message: "Veuillez joindre une image"})
    }
    if (!validMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({message :'Seulement des images de types JPG, JPEG, WEBP, PNG sont autorisées'})
    }
    if (req.file.size > 16 * 1024 * 1024) {
        return res.status(400).json({message: "L'image ne doit pas dépasser 16MB"})
    } else {
        next()
    }
}

export default validateImage    