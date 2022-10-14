import { STATUS_CODE } from "../enums/StatusCode.js";
import userSchema from "../schemas/user.js";
import userSignUpSchema from "../schemas/userSignUp.js";

export async function validateCreateUser(req,res,next){
    const newUser = req.body;
    const joiValidation = userSignUpSchema.validate(newUser,{abortEarly: false})

    if(joiValidation.error){
     //  const errorMessage = joiValidation.error.details.map(detail => detail.message);
       return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

    }
    next();
}

export async function validateUser(req,res,next){
    const user = req.body;

    const joiValidation = userSchema.validate(user,{abortEarly: false});

    if(joiValidation.error){
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }
    next();
}
