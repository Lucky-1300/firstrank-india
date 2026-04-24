import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  city: { type: String, default: "" },
  state: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);

export default User;