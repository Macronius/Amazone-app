import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAuth, isAdmin, isSellerOrAdmin } from "../utils.js";

const productRouter = express.Router();

//create api for sending list of product to frontend
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    //filter products only for sellers
    const name = req.query.name || "";
    const seller = req.query.seller || "";
    const category = req.query.category || "";
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const products = await Product.find({
      ...nameFilter,
      ...sellerFilter,
      ...categoryFilter,
    }).populate("seller", "seller.name seller.logo"); //.find({}) returns entire object (or all products (in this case))
    //NOTE: spread operator to deconstruct this and only put the field of seller, not the object
    res.send(products);
  })
);

//product categories list api for search screen
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

//define an API called seed; creates products based on data.products file
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await.Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

//details API, for sending product details to frontend
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "seller.name seller.logo seller.rating seller.numReviews"
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);



// 'post' - creating resource in backend
productRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name" + Date.now(),
      seller: req.user._id, //seller id to be filled by current user
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

// 'post' because a product must have been created in order to be edited
productRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId); //QUESTION: what exactly is 'Product' ?
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      const updatedProduct = await product.save();

      res.send({
        message: "Product Updated Successfully",
        product: updatedProduct,
      }); //QUESTION: what happens if I change 'product:' to 'payload:' ?
    } else {
      res.status(404).send({ message: "Product not found" });
    }
    //NOTE: updating the product object, not product class
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
//QUESTION: what exactly is going on here

export default productRouter;
