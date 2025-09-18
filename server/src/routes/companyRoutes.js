const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const { validateCompany,validateCompanyQuery } = require("../middleware/validateMiddleware");

// Routes
router.get("/",validateCompanyQuery,companyController.getAllCompanies);
router.post("/", validateCompany, companyController.createCompany);

router.get("/:id", companyController.getCompanyById);
router.put("/:id", validateCompany, companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
