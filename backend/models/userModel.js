import mongoose from "mongoose";

//create schema for user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, requried: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

//create a model based on schema    (mongoose.model() - function that accepts two parameters: modelName, schema)
const User = mongoose.model("User", userSchema);

export default User;
