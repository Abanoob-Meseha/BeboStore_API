const {productModel} = require('../models/product');

const addProduct = async (req , res , next)=>{
    try {
        let product = new productModel(req.body);
        let productData = await product.save();
        res.status(201).json({
            status:'OK',
            message:'Product Added Successfuly !!',
            product: productData
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {addProduct}