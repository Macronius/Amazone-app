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
    const pageSize = 3;
    //get page number from query string of api
    const page = Number(req.query.pageNumber) || 1;  //see productActions.js line
    //filter products only for sellers
    const name = req.query.name || "";
    const seller = req.query.seller || "";
    const order = req.query.order || "";
    const category = req.query.category || "";
    const min =
      req.query.min && Number(req.query.min) != 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) != 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) != 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 }; //NOTE: where 1 and -1 indicate ascending and descending order

    const count = await Product.count({
      ...nameFilter,
      ...sellerFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      ...nameFilter,
      ...sellerFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate("seller", "seller.name seller.logo")
      .sort(sortOrder)
      .skip(pageSize*(page - 1))
      .limit(pageSize)
      ; //.find({}) returns entire object (or all products (in this case))
    //NOTE: spread operator to deconstruct this and only put the field of seller, not the object
    res.send({products, page, pages: Math.ceil(count / pageSize)});
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
    const seller = await User.findOne({isSeller: true}); //get first user in user collection that isSeller is true
    if(seller){
      //Create new products array; convert all products and add a new field 'seller' and set seller id with first user in db where isSeller is true
      const products = data.products.map( (product)=> ({
        ...product,
        seller: seller._id,
      }));
      //use insertMany to insert products inside database
      const createdProducts = await Product.insertMany(products);
      res.send({createdProducts});
    }else{
      res
      .status(500)
      .send({message: 'No seller found. first run /api/users/seed'});
    }
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
    const product = await Product.findById(productId); //QUESTION: what exactly is 'Product'? ANSWER: it comes from productModel (mongoose.model productSchema)
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

productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    //add new review to product reviews
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      //update numReview and rating
      product.numReviews = product.reviews.length;
      //create and calculate the rating
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      //save the review
      const updatedProduct = await product.save();
      //status 201 bc created a new resource
      res.status(201).send({
        message: "Product Review Created Successfully",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

export default productRouter;
