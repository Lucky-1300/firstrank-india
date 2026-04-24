import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// ================= REGISTER =================
const register = async (userData) => {
  const { name, email, password, mobile, city, state } = userData;

  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists ");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    mobile,
    city: city || "",
    state: state || "",
  });

  // 4. Return safe data (no password)
  return {
    message: "User registered successfully ",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      city: user.city,
      state: user.state,
      isPremium: user.isPremium,
      premiumExpiresAt: user.premiumExpiresAt,
    },
  };
};

// ================= LOGIN =================
const login = async (email, password) => {
  // 1. Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found ");
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials ");
  }

  // 3. Return safe data
  return {
    message: "Login successful ",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      state: user.state,
      isPremium: user.isPremium,
      premiumExpiresAt: user.premiumExpiresAt,
    },
  };
};

// ================= EXPORT =================
export { register, login };
