const { AppError } = require('./errorHandling');

const validate = (schema)=>{
    return (req , res , next)=>{
        let {error} = schema.validate(req.body , {abortEarly : false});
        if(error){
           throw new AppError(400 , error.details.map(detail=>detail.message).join(', ')) 
        }
        next()
    }
}

module.exports = validate ;