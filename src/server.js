import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import authRouter from '../src/routers/authRouter.js'
import urlsRouter from '../src/routers/urlsRouter.js'
import userRouter from '../src/routers/userRouter.js'
import rankinRouter from '../src/routers/rankingRouter.js'

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(urlsRouter);
server.use(userRouter);
server.use(rankinRouter);


server.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})




