const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");

exports.categoryProduct = (req, res) => {
  const { name, price, description, quantity, category, createdBy } = req.body;

  const product = await Product.findOne({ name: name });
  if(product) {
    throw new Error("Product name already created")
  }

  let productPicture = [];

  if (req.files.length > 0) {
    productPicture = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    productPicture,
    category,
    quantity,
    createdBy: req.user._id,
  });

  product.save((err, data) => {
    if (err) return res.status(400).json({ err });
    if (data) {
      res.status(400).json({ data });
    }
  });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

// new update
exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};
