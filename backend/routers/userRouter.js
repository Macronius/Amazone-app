import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

//api to return list of top-sellers
userRouter.get(
  "/top-sellers",
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ "seller.rating": -1 })
      .limit(3);
    res.send(topSellers);
  })
);

//define a get method for seed API
userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //to remove all users before creating new users, go to userRouter
    // await.User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers }); //QUESTION: why is createdUsers in braces?
  })
);

//=============================== P O S T
//create sign-in router
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    //check user: if user with that email exists, check password
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      //QUESTION: did I create User or is it built-in somewhere?
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save(); //create new user and set new user to createdUser
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(createdUser),
    });
  })
);

//=============================== G E T
userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id); //QUESTION: why do I have to specify .id if i'm findById ?
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

//=============================== P U T
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //get user from database
    const user = await User.findById(req.user._id); //by the id of the logged-in user
    //QUESTION: where is the _id for comparison?
    //QUESTION: which file is being searched for this process?
    //QUESTION: why does User not have to be instantiated like above in '/register'

    if (user) {
      //update user information
      user.name = req.body.name || user.name; //if name from ProfileScreen exists, then use it, else use existing name
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerdescription || user.seller.description;
      }
      if (req.body.password) {
        //take extra step to encrypt the password
        user.password = bcrypt.hashSync(req.body.password, 8); //8 generates the auto-salt
      }

      const updatedUser = await user.save();

      //send id of user from updated user
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

//api for Admin users list
userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);
//NOTE: unauthenticated user should not be able to see the ProfileScreen at all
//        - requires a PrivateRoute.js component

//NOTE: it seems the function of this is to repost the entire contents of the user profile every time update, either re-write or over-write

//api for Admin delete users from UserListScreen
userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin === true) {
        res.status(400).send({ message: "Cannot Delete Admin User" });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: "User Deleted Successfully", user: deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

//api to update user information
userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = req.body.isSeller || user.isSeller;
      user.isAdmin = req.body.isAdmin || user.isAdmin;

      const updatedUser = await user.save();

      res.send({ message: "User Information Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
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

//create sign-in router
//posthttpware, when return sign-in data, generate a token to authenticate user for next request
//when creating a new resource, set httpware as post request for security reasons, no sensitive information shows up in the url bar

//json web token generates a hash-stream that must be used for the next request to authenticate the request
