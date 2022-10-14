import joi from 'joi'

const userSignUpSchema = joi.object({
    name: joi.string().required().min(1).max(15),
    email:joi.string().required().min(1),
    password:joi.string().required().min(1).max(8),
    confirmPassword: joi.string().required().min(1).max(8).valid(joi.ref('password'))
});
export default userSignUpSchema;