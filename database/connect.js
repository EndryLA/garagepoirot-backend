import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const database = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.DB_CERTIFICATE

    }
})

database.connect((error) => {
    if (error) {
        console.log('Erreur de connexion à la base de données :', error)
        return;
    }
    console.log('Connexion à la base de données MYSQL Réussie')
})

export default database



