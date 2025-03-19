const express = require("express");
const validate = require("../middlewares/validator");
const productsRouter = express.Router();
const productController = require("../controllers/productsController");

const {
  addProduct_schema,
  updateProduct_schema,
} = require("../validation/product");
const { isAdmin, authenticateToken } = require("../middlewares/auth");
const multerFileBuffer = require("../middlewares/multer");

// any user
productsRouter.get("/", productController.getProducts);
productsRouter.get("/:id", productController.getProductByID);

// admin user
productsRouter.post(
  "/",
  authenticateToken,
  isAdmin,
  multerFileBuffer(5),
  validate(addProduct_schema),
  productController.addProduct
);
productsRouter.put(
  "/:id",
  authenticateToken,
  isAdmin,
  multerFileBuffer(5),
  validate(updateProduct_schema),
  productController.updateProduct
);
productsRouter.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  productController.deleteProduct
);

module.exports = productsRouter;
