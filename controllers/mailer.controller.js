import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()


export const sendMail = (req,res) => {
    const {firstname, lastname, email, message} = req.body
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service:process.env.EMAIL_SERVICE,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from:email,
        to:process.env.EMAIL_USER,
        subject:`Garage V. Poirot - ${firstname} ${lastname}`,
        text:message
    }
    try {

        transporter.sendMail(mailOptions,(error, info) => {
            if (error) {
                res.status(500).json({error})
            } else {
                res.status(200).json({message : "Votre message a été envoyé"})
            }
        })

    } catch(error) {
        res.status(500).json(error)
    }
}

export default sendMail