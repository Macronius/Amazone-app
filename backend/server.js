import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"; //NOTE: 'path' is a built-in Node package
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

//to read .env file in utils.js variable
dotenv.config();

//create an app from express
const app = express();
//parse the http request
app.use(express.json()); //this adds a new middleware which parses json data in the body of request
app.use(express.urlencoded({ extended: true }));
//NOTE: by doing the above two, all data that contains like "example in postman", will be translated to req.body in the node application

//connect
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter); //use userRouter and productRouter in server.js
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter); //responder is orderRouter
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res)=> {
  res.send(process.env.GOOGLE_API_KEY || "");
});

const __dirname = path.resolve(); //returns current folder, saved as __dirname, then used to concatenate the current folder to the upload folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); //add a new line to show the images that upload to the uploads folder

app.use(express.static(path.join(__dirname, "/frontend/build")));  //serve file inside build folder
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);  //serve all addresses by index.html

//therefore, no need for the following three lines of vode
// app.get("/", (req, res) => {
//   res.send("Server is ready"); //define the first route, the root of backend responds "server is ready"
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message }); //error-catching middleware, works with expressAsyncHandler
});

const port = process.env.PORT || 5000; //define a listen() method for the app to listen for a port# from environment variable
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

//no longer required code:..
//mongodb://localhost/databaseforwebsite
//useNewUrlParser - to get rid of duplicated warnings
//NOTE: the above line of code connects to the MongoDB database

//define a product details api
// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product not Found" });
//   }
// });
//NOTE: above removed because it returns static data, already handled by MongoDB

//define an api
//return products by creating another route
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });
//NOTE: above removed because it returns static data, already handled by MongoDB
