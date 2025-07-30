import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { router } from './app/router/index'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/v1', router)

app.get('/', (req, res) => {
    res.send("Ride booking app is running successfully.")
})

app.use(globalErrorHandler)

export default app