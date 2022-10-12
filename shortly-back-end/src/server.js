import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import authRouter from '../routers/authRouter.js'

dotenv.config();

const server = express();
server.use(cors());

server.use(authRouter);

server.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})




