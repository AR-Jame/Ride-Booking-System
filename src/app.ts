import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
// import { router } from './app/router';

const app = express();

app.use(express.json());
app.use(cors())
app.use(cookieParser());


// app.use(router)

app.get('/', (req, res) => {
    res.send("Ride booking app is running successfully.")
})


export default app