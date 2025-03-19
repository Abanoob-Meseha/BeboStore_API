require('dotenv').config(); // config .env file vars
const express = require('express');
const app = express();
const productsRouter = require('./routes/productsRoutes')
const authRouter = require('./routes/authRoutes')
const cartRouter = require('./routes/cartRoutes')
const ordersRouter = require('./routes/ordersRoutes')
const paymentsRouter = require('./routes/paymentsRoutes')
const errorHandling = require('./middlewares/errorHandling'); 
const cookieParser = require('cookie-parser');

// for parsing req cookie to js object --> req.cookies
app.use(cookieParser());
// for parsing html forms to js object --> req.body
app.use(express.urlencoded({extended:true}))
// parsing requests in json Format to js object --> req.body
app.use(express.json());
// for Adding Routers
app.use('/auth', authRouter)
app.use('/products' , productsRouter)
app.use('/orders' , ordersRouter)
app.use('/cart' , cartRouter)
app.use('/payments' , paymentsRouter)

// i protected this route using jwt token check auth
app.get('/'  ,(req , res , next)=>{
    try{
        res.status(200).json({
            message: `Welcome to BeboStore API`,
            status: 200
        })
    }catch(err){
        next(err)
    }
    
})
// we put it at the End to Pass Error to it after Proccessing on Router Endpoints
app.use(errorHandling)


module.exports = app ;