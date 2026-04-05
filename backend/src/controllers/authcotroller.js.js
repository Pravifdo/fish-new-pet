import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // find user
    const user = await User.findOne({ email, userType });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    const image = req.file;

    // Validate required fields
    if (!email || !password || !userType || !image) {
      return res.status(400).json({
        message: "All fields (email, password, userType, image) are required"
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Convert image buffer to base64
    const imageBase64 = image.buffer.toString('base64');
    const imageDataUrl = `data:${image.mimetype};base64,${imageBase64}`;

    // create user
    const newUser = new User({
      name: name || 'User',
      email,
      password: hashedPassword,
      userType,
      image: imageDataUrl
    });

    await newUser.save();

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType
       
      }
    });
       console.log("New user registered:", newUser);


  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};