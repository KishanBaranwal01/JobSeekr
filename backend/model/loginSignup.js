import mongoose, { Schema } from "mongoose";

const LoginSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("LoginModel", LoginSchema);
export default LoginModel;