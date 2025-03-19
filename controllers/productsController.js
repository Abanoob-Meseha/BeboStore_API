const { AppError } = require("../middlewares/errorHandling");
const { Product } = require("../models");
const { uploadToCloudinary} = require("../config/cloudinary");

// add product and return product Object
const addProduct = async (req, res, next) => {
  try {
    const productExists = await Product.findOne({name: req.body.name});
    if(!!productExists){
      return res.status(400).json({
        success: false ,
        message : "Product name Already Exixts"
      })
    }
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded" });
    }
    // Upload each image to Cloudinary
    const imageUploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer , "Products")
    );
    const imageUrls = await Promise.all(imageUploadPromises);
    let product = new Product({ ...req.body, imgs: [...imageUrls] });
    let productData = await product.save();
    res.status(201).json({
      status: "success",
      message: "Product Added Successfuly !!",
      data: {
        product: productData,
      },
    });
  } catch (error) {
    next(error);
  }
};

// get all Products
const getProducts = async (req, res, next) => {
  try {
    // limit = how many Product / page
    // skip = skip the Page product when select another Page
    let { limit, page } = req.query;
    let skip = (page - 1) * limit;
    let products = await Product.find().skip(skip).limit(limit);
    let productsCount = await Product.countDocuments();
    let totalPages = Math.ceil(productsCount / limit);
    if (!products) {
      throw new AppError(404, "There are no Products Found ");
    }
    res.status(200).json({
      status: "success",
      message: "All Products Retrieved Successfully",
      data: {
        page,
        totalPages,
        productsCount,
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};
// return product found by Id
const getProductByID = async (req, res, next) => {
  try {
    let productID = req.params.id;
    let product = await Product.findById(productID);
    if (!product) {
      throw new AppError(404, "Product not Found");
    }
    res.status(200).json({
      status: "success",
      message: "Product Retrieved Successfully ... Done",
      data: {
        product: product,
      },
    });
  } catch (error) {
    next(error);
  }
};
// Update Product By Id
const updateProduct = async (req, res, next) => {
  try {
    let productID = req.params.id;
    let product = await Product.findByIdAndUpdate(productID, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure Mongoose validators are applied
    });
    if (!product) {
      throw new AppError(404, "Product not Found");
    }
    res.status(200).json({
      status: "success",
      message: "the product Updated Successfully...Done",
      data: {
        product: product,
      },
    });
  } catch (error) {
    next(error);
  }
};
// delete product by ID
const deleteProduct = async (req, res, next) => {
  try {
    let productID = req.params.id;
    let product = await Product.findByIdAndDelete(productID);
    if (!product) {
      throw new AppError(404, "Product Delete Failed .. or not Found");
    }
    res.status(200).json({
      status: "success",
      message: "Product Deleted Successfully .. Done",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  getProductByID,
  deleteProduct,
};
