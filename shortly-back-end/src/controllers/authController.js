import { STATUS_CODE } from "../enums/StatusCode.js";
import connection from "../database/database.js";
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'


export async function createUser(req,res){
    const {name,email,password} = req.body;
    const passwordHash = bcrypt.hashSync(password,6);

try {
    const user = await connection.query('SELECT * FROM users WHERE email = $1',[email]);
    if(user.rowCount === 1){
        return res.sendStatus(STATUS_CODE.CONFLICT)
    }   
    await connection.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)',[name,email,passwordHash]);
    return res.sendStatus(STATUS_CODE.CREATED);
} catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
}
}

export async function login(req,res){
    const {email,password}= req.body;


    try {
        const user = await connection.query(`SELECT * FROM users WHERE email= $1`,[email]);
        const userPassword = user.rows.map(value => value.password).toString();
        const validPassword = bcrypt.compareSync(password,userPassword);

        if(!validPassword  || user.rowCount === 0){
            return res.status(STATUS_CODE.UNAUTHORIZED).send({message : "Erro: email e/ou senha inválido(s)." });
        }      
        const token = uuid();
        await connection.query('INSERT INTO sessions("userId",token) VALUES($1,$2)',[user.rows[0].id, token]);

        return res.status(STATUS_CODE.OK).send({token: token});
      
    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}