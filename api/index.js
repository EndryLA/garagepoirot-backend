import express from 'express'
import dotenv from 'dotenv'
import servicesRouter from './routes/service.js'
import commentsRouter from './routes/comment.js'
import schedulesRouter from './routes/schedule.js'
import userRouter from './routes/user.js'
import imagesRouter from './routes/image.js'
import carsRouter from './routes/car.js'
import helmet from 'helmet';
import mailerRouter from './routes/mailer.js'
import cors from 'cors'

dotenv.config()
const app = express();

app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}));


app.use('/api/services',servicesRouter)
app.use('/api/comments',commentsRouter)
app.use('/api/schedules',schedulesRouter)
app.use('/api/users',userRouter)
app.use('/api/images',imagesRouter)
app.use('/api/cars',carsRouter)
app.use('/api/mail',mailerRouter)

app.listen(3000,() => {console.log('connected to the express server')})

export default (req, res) => {
    return new Promise((resolve, reject) => {
        app(req, res, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};