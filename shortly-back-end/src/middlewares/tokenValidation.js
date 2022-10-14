import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/StatusCode.js";

export async function validateToken(req,res,next){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer', '');
    let userToken;
    let id;
      
    if(!token){
        return res.status(STATUS_CODE.UNAUTHORIZED).send('Acess denied');
    }
    try {
       const session = await connection.query(`SELECT * FROM sessions WHERE token = $1`,[token]);
     
        if(session.rowCount === 0){
            return res.status(STATUS_CODE.UNAUTHORIZED).send('Acess denied');
        }
        
        userToken = session.rows[0].token;
        id = session.rows[0].userId;

    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
        return;
    }
    res.locals.token = userToken;
    res.locals.userId = id;
    next();
}