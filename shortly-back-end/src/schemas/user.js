import joi from 'joi'

const userSchema = joi.object({
    email:joi.string().required().min(1),
    password:joi.string().required().min(1),
});

export default userSchema