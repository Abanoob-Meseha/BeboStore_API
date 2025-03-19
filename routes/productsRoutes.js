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

productsRouter.get("/", productController.getProducts);
productsRouter.post(
  "/",
  authenticateToken,
  isAdmin,
  multerFileBuffer(3),
  validate(addProduct_schema),
  productController.addProduct
);
productsRouter.get("/:id", productController.getProductByID);
productsRouter.put(
  "/:id",
  validate(updateProduct_schema),
  productController.updateProduct
);
productsRouter.delete("/:id", productController.deleteProduct);

module.exports = productsRouter;
