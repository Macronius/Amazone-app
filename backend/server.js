import express from "express";
import mongoose from "mongoose";
import data from "./data.js"; //IMPORTANT: append extension for files on serverside
import userRouter from "./routers/userRouter.js";

//create an app from express
const app = express();

//connect
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
//mongodb://localhost/databaseforwebsite
//useNewUrlParser - to get rid of duplicated warnings
//NOTE: the above line of code connects to the MongoDB database

//use userRouter in server.js
app.use("/api/users", userRouter);

//define a product details api
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});

//define an api
//return products by creating another route
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

//define the first route, the root of backend responds "server is ready"
app.get("/", (req, res) => {
  res.send("Server is ready");
});

//error-catching middleware, works with expressAsyncHandler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//define a listen() method for the app to listen for a port# from environment variable
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
//ABOVE is a very basic server that lets user know it is ready upon opening
//NOTE: to open server, in terminal: node backend/server.js

//NOTE: Express is a Node js web application server framework, which is specifically design for building single/multi-page and hybrid web applications, standard server framework for node.js, the backend part of MERN stack

//NOTE: when a change is made in this code, the server must be stopped then restarted for it to show
//npm install --save-dev nodemon
//package that automatically rerurn node application when there is a change in your code
//then go to package.json, under scripts, replace 'test':'comment' with...
// "start": "nodemon --watch backend --exec node --experimental-modules backend/server.js"
// meaning: watch for change in backend, when change, execute comment node --experiemental-modules backend/server.js

//NOTE: when there is an error in your router and your router is wrapped in expressAsyncHandler, the error is directed to the middleware and the right error will be sent back to the frontend


