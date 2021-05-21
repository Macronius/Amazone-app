import mongoose from "mongoose";

//create schema for user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, requried: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
    },
  },
  { timestamps: true }
);

//create a model based on schema    (mongoose.model() - function that accepts two parameters: modelName, schema)
const User = mongoose.model("User", userSchema);

export default User;
