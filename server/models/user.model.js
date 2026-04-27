import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  mobile: {
    type: String,
    match: /^[0-9]{10}$/,
  },
  city: {
    type: String,
    default: "",
    trim: true,
  },
  state: {
    type: String,
    default: "",
    trim: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  premiumExpiresAt: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

export default User;