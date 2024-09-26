import express from 'express'
import dotenv from 'dotenv'
import servicesRouter from './routes/service.js'
import commentsRouter from './routes/comment.js'
import schedulesRouter from './routes/schedule.js'
import userRouter from './routes/user.js'
import imagesRouter from './routes/image.js'
import carsRouter from './routes/car.js'
import mailerRouter from './routes/mailer.js'
import cors from 'cors'

dotenv.config()
const app = express();

app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers',"Origin, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next()
});

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



