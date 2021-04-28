import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";

const userRouter = express.Router();

//define a get method for seed API
userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //to remove all users before creating new users, go to userRouter
    // await.User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

export default userRouter;

//use express.router to create a user router

//NOTE: express.Router() is a function that makes code modular instead of having all files in server.js
//NOTE: the regular form of creating an API is with req and res
//NOTE: the nature of mongoose is async
//QUESTION: '/seed' is this term used to 'create' the API? as opposed to just getting from an existing API?
//users inside data.js will be inserted to users collection in MongoDB

//line 9: User is the object from userModel.js
//NOTE: .insertMany() accepts an array, in this case, the users array from data.js
//REMINDER: by accessing the data.users array from data.js, data must be imported... don't forget the .js, else error

//RESULT: users inside data.js will be inserted to the users collection in MongoDB

//expressAsyncHandler() is a package that must be installed
