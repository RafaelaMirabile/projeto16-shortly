import { STATUS_CODE } from "../enums/StatusCode.js";
import {nanoid} from 'nanoid'
import connection from "../database/database.js";

export async function createUrl(req,res){
    const {url} = req.body;
    const user = res.locals.userId;
    const shortUrl = nanoid(10);
    
    try {
        await connection.query(`INSERT INTO urls ("userId",url,"shortenUrl") VALUES ($1,$2,$3)`,[user,url,shortUrl]);
        return res.status(STATUS_CODE.CREATED).send({shortUrl});
    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export async function getUrlById(req,res){
    const {id} = req.params;
    try {
        const url = await connection.query(`SELECT * FROM urls WHERE id=$1`,[id]);
        console.log(url);
       
        if(url.rowCount === 0){
            return res.status(STATUS_CODE.NOT_FOUND).send('url does not exist');
        }    
        
        const urlById = url.rows[0];
        
        const selectedUrl ={
           id: urlById.id,
           shortUrl: urlById.shortenUrl,
           url: urlById.url
        }
        return res.status(STATUS_CODE.OK).send(selectedUrl);   
    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export async function redirectToUrl(req,res){
    const {shortUrl} = req.params

    try {
        const url = await connection.query(`SELECT url,"visitCount" FROM urls WHERE "shortenUrl"=$1`,[shortUrl]);
        if(url.rowCount === 0){
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        const link = url.rows[0].url;
       
        const count = url.rows[0].visitCount;
        const newCount = count + 1;
        await connection.query('UPDATE urls SET "visitCount"= $1 WHERE "shortenUrl"= $2',[newCount,shortUrl])

       return res.redirect(STATUS_CODE.OK, link);

    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
        return;
    }
}

export async function deleteUrl(req,res){    
    const user= res.locals.userId;
    const url = req.params.id;

    try {
        const urls = await connection.query('SELECT "shortenUrl" FROM urls WHERE "userId"=$1',[user]);
        const searchUrl = urls.rows.filter(value => value.shortenUrl === url);

        if(searchUrl.length === 0){
            return res.status(STATUS_CODE.UNAUTHORIZED).send('Cannot found specified link');
        }

        await connection.query('DELETE FROM urls WHERE "shortenUrl"=$1',[searchUrl[0].shortenUrl]);
        return res.sendStatus(STATUS_CODE.NO_CONTENT);

    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
        return       
    }
}