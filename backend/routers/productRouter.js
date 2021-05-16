import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from "../utils.js";

const productRouter = express.Router();

//create api for sending list of product to frontend
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}); //.find({}) returns entire object (or all products (in this case))
    res.send(products);
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
    const product = await Product.findById(req.params.id);
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
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name" + Date.now(),
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

export default productRouter;
