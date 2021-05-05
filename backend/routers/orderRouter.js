import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

//create an api for post request to /api/orders
//NOTE: in this case, '/' means '/api/orders'
//NOTE: as a parameter of this expressAsyncHandler, define another function as an async that accepts request and response to build the api
orderRouter.post(
  // <-- the 'create order api'
  "/",
  isAuth, //defined as a middleware
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res
        .status(400)
        .send({ message: "client/validation error: Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id, //apparently only need id of user for orderModel
      });
      //after defining the order, it must then be created in the database
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
      //NOTE: pass the order to the frontend with 'order: createdOrder' code
      //NEXT: add orderRouter.js to server.js
    }
  })
);

export default orderRouter;

//NOTE: by calling next() function inside isAuth, req.user will be filled by user information
