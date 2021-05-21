import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

//create a middleware to authenticate the user, which accept 3 parameters
export const isAuth = (req, res, next) => {
  //get authorizations filled from headers of this request
  const authorization = req.headers.authorization;
  if (authorization) {
    //get the token of the request
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX - skip the first 7 and take only the token
    //decrypt the token, where decode contains the data about the user inside the token
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          //correct token: note: jwt.verify returned the jwt.sign() data inside 'decode' variable, then set those data inside req.user
          req.user = decode;
          //by passing next(), we pass user as a property of req ( req.user = decode ) to the next middleware, in this case, in orderRouter.js assigned isAuth
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Seller Token" });
  }
};

export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/Seller Token" });
  }
};

//NOTE: jwt json web token
//.sign takes 3 parameters
//      1st: user object ( { objectUsedToGenerateToken, })
//      2nd: json webtoken secret, key to generate token, does not go here, instead
//      3rd: options,

//NOTE: when imported in userRouter, it will be a 'named' import, because I named it 'generateToken' here
