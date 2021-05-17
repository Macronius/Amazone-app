import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth } from "../utils.js";

const orderRouter = express.Router();

//api to create list of orders
orderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "name"); //see import Order from orderModel.js
    res.send(orders);
  })
);
//QUESTION: what does populate() method do?
    //A: in orderModel.js, because there is a 'user' field, where the 'type' of field is 'ObjectId and its reference is 'User', by having having .populate('user', 'name'), you find the id of user and load the user information from user table or user collection and only put the name of user from that collection.
    //A: its like 'join' in sql
//QUESTION: where does populate() method come from?



orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders); //backend send orders of current user to frontend
  })
);

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

orderRouter.get(
  "/:id", //note: /api/orders/:id, where the prefix /api/orders is defined in server.js
  isAuth, //NOTE: only authenticated user can see order details
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id); //get order from database
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  }) //NOTE: use expressAsyncHandler to catch any error in async functions
);

//update the status of a source
orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id); //QUESTION: in the orderModel, there is no parameter called id... what is this refering to?
    if (order) {
      //if order is exists, update the order
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: "Order Paid", order: updatedOrder }); //send to frontend
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;

//NOTE: by calling next() function inside isAuth, req.user will be filled by user information

//NOTE: the last entry of a request is called the 'handler'
