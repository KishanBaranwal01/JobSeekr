import mongoose, { Schema } from "mongoose";

const ProviderSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ProviderModel = mongoose.model("ProviderModel", ProviderSchema);
export default ProviderModel;