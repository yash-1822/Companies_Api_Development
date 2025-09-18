const { body, validationResult, query } = require("express-validator");

exports.validateCompany = [
  body("name")
    .trim()
    .notEmpty().withMessage("Company name is required")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),

  body("address")
    .trim()
    .notEmpty().withMessage("Address is required")
    .isLength({ max: 200 }).withMessage("Address cannot exceed 200 characters"),

  body("industry")
    .trim()
    .notEmpty().withMessage("Industry is required")
    .isLength({ max: 50 }).withMessage("Industry cannot exceed 50 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).withMessage("Email must be in the format text@gmail.com"),

  body("location")
    .trim()
    .notEmpty().withMessage("Location is required")
    .isLength({ max: 100 }).withMessage("Location cannot exceed 100 characters"),

  body("employeeCount")
    .optional()
    .isInt({ min: 0 }).withMessage("Employee count must be a positive integer"),

  body("foundedYear")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage("Invalid founded year"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage("Description cannot exceed 1000 characters"),

  body("totalBranches")
    .optional()
    .isInt({ min: 0 }).withMessage("Total branches cannot be negative"),

  body("totalClients")
    .optional()
    .isInt({ min: 0 }).withMessage("Total clients cannot be negative"),

  body("imageUrl")
    .optional()
    .trim()
    .isString().withMessage("Image URL must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }
    next();
  }
];

exports.validateCompanyQuery = [
  query("search")
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage("Search too long"),

  query("industry")
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage("Invalid industry"),

  query("location")
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage("Invalid location"),

  query("foundedYear")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage("Invalid founded year"),

  query("page")
    .optional()
    .isInt({ min: 1 }).withMessage("Page must be >= 1"),

  query("limit")
    .optional()
    .isInt({ min: 1 }).withMessage("Limit must be >= 1"),

  query("sortBy")
    .optional()
    .isIn(["totalClients", "totalBranches", "name", "foundedYear","employeeCount"])
    .withMessage("Invalid sort field"),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"]).withMessage("Sort order must be 'asc' or 'desc'"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Invalid query parameters");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }
    next();
  }
];

