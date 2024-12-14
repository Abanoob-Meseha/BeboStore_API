const express = require('express');
const validate = require('../middlewares/validator');
const { joiProductSchema } = require('../models/product');
const productsRouter = express.Router();
const productController = require('../controllers/products.controller')

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