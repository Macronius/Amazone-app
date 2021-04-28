import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

//NOTE: jwt json web token
//.sign takes 3 parameters
//      1st: user object ( { objectUsedToGenerateToken, })
//      2nd: json webtoken secret, key to generate token, does not go here, instead
//      3rd: options,

//NOTE: when imported in userRouter, it will be a 'named' import, because I named it 'generateToken' here
