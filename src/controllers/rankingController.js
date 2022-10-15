import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/StatusCode.js";

export async function getRanking(req,res){
    try {
        let ranking = await connection.query('SELECT users.id, users.name,COUNT (urls."userId")::int AS "linksCount",COALESCE(SUM(urls."visitCount"), 0)::int AS "visitCount" FROM urls RIGHT JOIN users ON urls."userId"=users.id GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10')
        ranking = ranking.rows;
        return res.status(STATUS_CODE.OK).send(ranking);
    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
        return;
    }
}