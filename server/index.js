const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const StudentModel = require("./models/Student");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB with error handling
mongoose.connect("mongodb://127.0.0.1:27017/Student")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Login endpoint with better error handling
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        status: "Failed", 
        error: "Email and password are required" 
      });
    }

    const student = await StudentModel.findOne({ email });
    
    if (!student) {
      return res.status(404).json({ 
        status: "Failed", 
        error: "Student not found" 
      });
    }

    // In a real app, you should use bcrypt to compare hashed passwords
    if (student.password !== password) {
      return res.status(401).json({ 
        status: "Failed", 
        error: "Password incorrect" 
      });
    }

    res.json({
      status: "Success",
      user: {
        name: student.name,
        email: student.email,
        phone: student.phone || "",
        location: student.location || "",
        bio: student.bio || "",
        profilePicture: student.profilePicture || "/api/placeholder/150/150"
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      status: "Failed", 
      error: "Server error during login" 
    });
  }
});

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const student = await StudentModel.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).json({ 
      status: "Failed", 
      error: err.message 
    });
  }
});

// Update profile endpoint
app.post("/update-profile", async (req, res) => {
  try {
    const { email, ...updateData } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        status: "Failed", 
        error: "Email is required" 
      });
    }

    const student = await StudentModel.findOneAndUpdate(
      { email },
      updateData,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ 
        status: "Failed", 
        error: "User not found" 
      });
    }

    res.json({
      status: "Success",
      user: {
        name: student.name,
        email: student.email,
        phone: student.phone || "",
        location: student.location || "",
        bio: student.bio || "",
        profilePicture: student.profilePicture || "/api/placeholder/150/150"
      }
    });

  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ 
      status: "Failed", 
      error: err.message 
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});