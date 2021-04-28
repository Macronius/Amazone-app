import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
//import data from "./data.js"; //no need since MongoDB //IMPORTANT: append extension for files on serverside
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

//to read .env file in utils.js variable
dotenv.config(); 

//create an app from express
const app = express();
//parse the http request
app.use(express.json());    //this adds a new middleware which parses json data in the body of request
app.use(express.urlencoded( {extended: true}));
//NOTE: by doing the above two, all data that contains like "example in postman", will be translated to req.body in the node application

//connect
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
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


app.use("/api/users", userRouter);  //use userRouter and productRouter in server.js
app.use("/api/products", productRouter);


app.get("/", (req, res) => {
  res.send("Server is ready"); //define the first route, the root of backend responds "server is ready"
});


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message }); //error-catching middleware, works with expressAsyncHandler
});

const port = process.env.PORT || 5000;  //define a listen() method for the app to listen for a port# from environment variable
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


