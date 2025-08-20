import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ProviderModel from "../model/providerModel.js";


export const Signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
      // Check if user already exists
      const existingUser = await ProviderModel.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new ProviderModel({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
  
    } catch (error) {
      console.error("Signup Error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// 🔹 Login Route
 export const Login= async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await ProviderModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

