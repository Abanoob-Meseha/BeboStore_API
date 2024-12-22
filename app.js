require('dotenv').config(); // config .env file vars
const express = require('express');
const app = express();
const productsRouter = require('./routes/productsRoutes')
const authRouter = require('./routes/authRoutes')
const cartRouter = require('./routes/cartRoutes')
const ordersRouter = require('./routes/ordersRoutes')
const paymentsRouter = require('./routes/paymentsRoutes')
const {errorHandling} = require('./middlewares/errorHandlingMiddleware'); 
const { authenticateToken } = require('./middlewares/authMiddleware');

// parsing requests in json Format
app.use(express.json());
// for Adding Routers
app.use('/products' , productsRouter)
app.use('/orders' , ordersRouter)
app.use('/cart' , cartRouter)
app.use('/auth', authRouter)
app.use('/payments' , paymentsRouter)

app.get('/' , authenticateToken ,(req , res , next)=>{
    try{
        res.status(200).json({
            message: `Welcome back ${req.user.username}`,
            status: 200
        })
    }catch(err){
        next(err)
    }
    
})
// we put it at the End to Pass Error to it after Proccessing on Router Endpoints
app.use(errorHandling)


module.exports = app ;