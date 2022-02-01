const express = require("express");
const {
  categoryProduct,
  getProductDetailsById,
  deleteProductById,
  getProducts,
} = require("../controller/product");
const { auth, adminMiddleware } = require("../middleware");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const { validateProduct } = require("../validators/product");
const { isRequestValidate } = require("../validators/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  auth,
  adminMiddleware,
  validateProduct,
  isRequestValidate,
  upload.array("productPicture"),
  categoryProduct
);
router.get("/product/:productId", getProductDetailsById);
router.delete(
  "/product/deleteProductById",
  auth,
  adminMiddleware,
  deleteProductById
);
router.post(
  "/product/getProducts",
  auth,
  adminMiddleware,
  getProducts
);

module.exports = router;
