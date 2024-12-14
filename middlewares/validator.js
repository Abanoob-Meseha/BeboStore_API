const { AppError } = require('./errorHandling');

const validate = (schema)=>{
    return (req , res , next)=>{
        let {validationErrors} = schema.validate(req.body);
        if(validationErrors){
           return next( new AppError(400 , validationErrors.details[0].message) )
        }
        next()
    }
}

module.exports = validate ;