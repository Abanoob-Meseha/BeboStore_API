// to create Error Objects From it
class AppError extends Error {
    constructor(statusCode , message){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true ;
        // Binds the error functions list to the object not constructor
        Error.captureStackTrace(this , this.constructor);
    }
}

const errorHandling = (err , req , res ,next )=>{
    if(!err.isOperational){
    // here I handle Bugs and problems of my server
        console.error('unexpected programming Error Happened!!' , err);
        return res.status(500).json({
            status:'error',
            message: 'Something Went Wrong , please Try to fix it'
        })
    }
    // here I handle the problems and issues of thr user misusing
    // operational Errors like
    // 1- user inputs   2- file unAvailable   3-network Issues  4- permission error
    res.status(err.statusCode || 500).json({
        status:'error',
        message: err.message || 'unknown operational Error Occured!'
    })
}

module.exports = {AppError , errorHandling};