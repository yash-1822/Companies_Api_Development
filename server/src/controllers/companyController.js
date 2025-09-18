const Company = require("../models/companyModel");
const AppError = require("../utils/errorHandler");

// Create a new company
exports.createCompany = async (req, res, next) => {
  try {
    const { name, address, industry, email, employeeCount, foundedYear, description, location, totalBranches, totalClients, imageUrl } = req.body;

    const company = await Company.create({
      name,
      address,
      industry,
      email,
      employeeCount,
      foundedYear,
      description,
      location,
      totalBranches,
      totalClients,
      imageUrl
    });

    res.status(201).json({
      success: true,
      data: company
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000 && error.keyValue?.name) {
      error.statusCode = 400;
      error.message = `Company with name "${error.keyValue.name}" already exists`;
    }
    next(error);
  }
};




exports.getAllCompanies = async (req, res, next) => {
  try {
    const {
      search,
      industry,
      location,
      foundedYear,
      page = 1,
      limit = 10,
      sortBy,
      sortOrder,
    } = req.query;

    const filter = {};

    // Free-text search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ];
    }

    // Exact-match filters
    if (industry) filter.industry = industry;
    if (location) filter.location = location;
    if (foundedYear) filter.foundedYear = Number(foundedYear);

    const total = await Company.countDocuments(filter);

    let sortCriteria = {};

    if (sortBy === "name") {
      sortCriteria = { createdAt: -1 };
    } 
    else if (sortBy) {
      const order = sortOrder === "desc" ? -1 : 1;
      sortCriteria[sortBy] = order;
      sortCriteria.createdAt = -1;
    } else {
      sortCriteria = { createdAt: -1 };
    }

    const companies = await Company.find(filter)
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};



// Get a company by ID
exports.getCompanyById = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return next(new AppError("Company not found", 404));
        }
        res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
        next(error);
    }
};

// Update a company
exports.updateCompany = async (req, res, next) => {
    try {
        const {address,name,industry,email,employeeCount,foundedYear,description,location,totalBranches,totalClients,imageUrl
        } = req.body;
        const updateData = {
            name,
            address,
            industry,
            email,
            employeeCount,
            foundedYear,
            description,
            location,
            totalBranches,
            totalClients,
            imageUrl
        };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

        if (!company) {
            return next(new AppError("Company not found", 404));
        }
        res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      error = new AppError("Company name already exists", 400);
    }
        next(error);
    }
};

// Delete a company
exports.deleteCompany = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return next(new AppError("Company not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "Company deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
