const express = require('express');
const validate = require('../middlewares/validatorMiddleware');
const { joiProductSchema  , joiUpdateProductSchema} = require('../models/productModel');
const productsRouter = express.Router();
const productController = require('../controllers/productsController')

productsRouter.get('/'  , productController.getProducts)
productsRouter.post('/' , validate(joiProductSchema) , productController.addProduct)
productsRouter.get('/:id' , productController.getProductByID)
productsRouter.put('/:id' , validate(joiUpdateProductSchema), productController.updateProduct)
productsRouter.delete('/:id' , productController.deleteProduct)

module.exports = productsRouter;