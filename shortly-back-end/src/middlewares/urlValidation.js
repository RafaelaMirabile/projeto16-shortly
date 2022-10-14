import { STATUS_CODE } from "../enums/StatusCode.js";
import urlSchema from "../schemas/url.js";

export async function validateUrl(res,req,next){
    const newUrl = req.body;

    const joiValidation = urlSchema.validate(newUrl,{abortEarly: false});

    if(joiValidation.error){
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }
    next();
}