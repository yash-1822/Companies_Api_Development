const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
    maxlength: 100,
    unique: true 
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
    maxlength: 200
  },
  industry: {
    type: String,
    required: [true, "Industry is required"],
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    validate: {
      validator: function(v) {
        return /^.+@gmail\.com$/.test(v); 
      },
      message: "Email must be in the format text@gmail.com"
    }
  },
  employeeCount: {
    type: Number,
    min: [0, "Employee count cannot be negative"]
  },
  foundedYear: {
    type: Number,
    min: [1800, "Invalid year"],
    max: [new Date().getFullYear(), "Invalid year"]
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
    maxlength: 100
  },
  totalBranches: {
    type: Number,
    min: [0, "Total branches cannot be negative"]
  },
  totalClients: {
    type: Number,
    min: [0, "Total clients cannot be negative"]
  },
  imageUrl: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better performance
companySchema.index({ industry: 1 });
companySchema.index({ location: 1 });

module.exports = mongoose.model("Company", companySchema);
