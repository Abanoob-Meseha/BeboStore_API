const { AppError } = require("../middlewares/errorHandling");
const { Product } = require("../models");
const { uploadToCloudinary, cloudinary } = require("../config/cloudinary");

// add product and return product Object
const addProduct = async (req, res, next) => {
  try {
    const productExists = await Product.findOne({ name: req.body.name });
    if (!!productExists) {
      return res.status(400).json({
        success: false,
        message: "Product name Already Exixts",
      });
    }
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded" });
    }
    // Upload each image to Cloudinary
    const imageUploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer, "Products")
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

// Update Product By Id
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // If the user uploads new images
    let newImageUrls = [];
    if (req.files && req.files.length > 0) {
      if (req.files.length + product.imgs.length > 5) {
        return res
          .status(400)
          .json({
            success: false,
            message: "A product can have a maximum of 5 images.",
          });
      }
      // Upload new images to Cloudinary
      const imageUploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer, "Products")
      );
      newImageUrls = await Promise.all(imageUploadPromises);
    }

    // Merge existing images with new ones
    const updatedImages = [...product.imgs, ...newImageUrls];

    // Update the product
    product = await Product.findByIdAndUpdate(
      id,
      { ...req.body, imgs: updatedImages },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

const deleteProductImage = async (req, res, next) => {
  try {
    const {productId} = req.params ;
    const { imageUrl } = req.body;

    // 1️⃣ Find the product
    let product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // 2️⃣ Check if the image exists in the product
    if (!product.imgs.includes(imageUrl)) {
      return res
        .status(400)
        .json({ success: false, message: "Image not found in product" });
    }

    // 3️⃣ Extract Cloudinary public ID
    const publicId = imageUrl.split("/").pop().split(".")[0];

    // 4️⃣ Delete the image from Cloudinary
    await cloudinary.uploader.destroy(`Products/${publicId}`);

    // 5️⃣ Remove the image URL from the product's `imgs` array
    product.imgs = product.imgs.filter((img) => img !== imageUrl);

    // 6️⃣ Save the updated product
    await product.save();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: { product },
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
  deleteProductImage
};
