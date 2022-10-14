import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/StatusCode.js";

export async function getUserUrls(req,res){   
    const userName = req.params.me;
    const id = res.locals.userId;

    try {
        const userIsValid = await connection.query('SELECT name FROM users WHERE name=$1',[userName]);
        if(userIsValid.rowCount === 0){
            return res.status(STATUS_CODE.NOT_FOUND).send('user does not exists');
        }
        const urls = await connection.query('SELECT id,"shortenUrl",url,"visitCount" FROM urls WHERE "userId"=$1',[id]);
        const shortenedUrls = urls.rows;
        let sum = await connection.query('SELECT SUM ("visitCount") FROM urls WHERE "userId"=$1',[id])
        sum =Number(sum.rows[0].sum);

        const userTrack = {
            id,
            name: userName,
            visitCount: sum,
            shortenedUrls
        }

        return res.status(STATUS_CODE.OK).send(userTrack);

    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

