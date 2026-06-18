import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

//REGISTER 

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//LOGIN


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(
      password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//ME

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

//UPDATE PROFILE

export const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      location,
      bio,
      skills,
      resumeUrl,
      profilePicture,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.fullName =
      fullName || user.fullName;

    user.phone =
      phone || user.phone;

    user.location =
      location || user.location;

    user.bio =
      bio || user.bio;

    user.skills = skills
      ? skills.split(",").map(
        (skill) => skill.trim()
      )
      : user.skills;

    user.resumeUrl =
      resumeUrl || user.resumeUrl;

    user.profilePicture =
      profilePicture ||
      user.profilePicture;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//LOGOUT

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};