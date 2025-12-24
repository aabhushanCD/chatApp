import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../Lib/cloudinary.js";

//Login controller __________________________________!______________________________________________________________
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "required all fields",
      });
    }

    if (password.length < 6) {
      return res.status(401).json({
        message: "password must be greater or equal to 6",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    return res.status(200).json({
      message: "Login Successful",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(501).json({ message: "Server Error!" });
  }
};

//signUp controller _________________________________!______________________________________________________________
export const signUp = async (req, res) => {
  const { fullName, password, email } = req.body;
  try {
    if (!fullName || !password || !email) {
      return res.status(400).json({ message: "All field required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      password: hashedPassword,
      email,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signUp controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
  ``;
};

//logOut controller _________________________________!______________________________________________________________
export const logOut = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

//updateProfile controller __________________________!______________________________________________________________
export const updateProfile = async (req, res) => {
  try {
    const profilePic = req.file;
    const userId = req.user._id;
    if (!userId || !profilePic) {
      return res.status(400).json({ message: "Required all fields" });
    }
    const base64Image = `data:${
      profilePic.mimetype
    };base64,${profilePic.buffer.toString("base64")}`;
    const uploadResponse = await cloudinary.uploader.upload(base64Image);
    if (!uploadResponse) {
      return res
        .status(500)
        .json({ message: "cannot upload profile picture server side error" });
    }
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    return res.status(200).json({ updateUser });
  } catch (error) {
    console.log("error in update profile:", error);
  }
};

//checkauth controller ______________________________!_______________________________________________________________
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
