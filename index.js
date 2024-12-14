// config .env file vars
require('dotenv').config();
const express = require('express');
const app = express();
const productsRouter = require('./routes/products')
const authRouter = require('./routes/auth')
const cartRouter = require('./routes/cart')
const ordersRouter = require('./routes/orders')
const paymentsRouter = require('./routes/payments')
const {AppError , errorHandling} = require('./middlewares/errorHandling') 
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const client = new MongoClient(process.env.URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
// parsing requests in json Format
app.use(express.json());
// for Adding Routers
app.use('/products' , productsRouter)
app.use('/orders' , ordersRouter)
app.use('/cart' , cartRouter)
app.use('/auth', authRouter)
app.use('/payments' , paymentsRouter)

app.get('/' , (req , res , next)=>{
    try{
        res.status(200).json({
            message: "Welcome To BeboStore",
            status: 200
        })
    }catch(err){
        next(err)
    }
    
})
// we put it at the End to Pass Error to it after Proccessing on Router Endpoints
app.use(errorHandling)

// connecting to mongoDB Cloud 
async function mongodbConnect (){
    try{
        await mongoose.connect(process.env.URI , {dbName:'BeboStore_mongoDB'});
        console.log("Connection Succedded to MongoDB")

    }catch{
        console.log("Connection Failed to MongoDB")
    }
}
mongodbConnect();

app.listen(process.env.PORT , (err)=>{
    if(err){
        console.log("Problem Running the Server" , err);
        return
    }
    console.log (`Server is Running on port: ${process.env.PORT}`)
})
