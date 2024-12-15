const express = require('express');
const validate = require('../middlewares/validatorMiddleware');
const { joiProductSchema } = require('../models/productModel');
const productsRouter = express.Router();
const productController = require('../controllers/productsController')

productsRouter.get('/'  ,(req , res)=>{
    res.status(200).send("Here Are our Products List")
})

productsRouter.post('/' , validate(joiProductSchema) , productController.addProduct)

productsRouter.get('/:id' , (req , res)=>{

})
productsRouter.put('/:id' , (req , res)=>{

})
productsRouter.delete('/:id' , (req , res)=>{
    
})

module.exports = productsRouter;