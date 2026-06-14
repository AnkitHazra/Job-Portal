import express from "express";

import {
  createCompany,
  getMyCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Create Company
router.post(
  "/",
  protect,
  authorize("recruiter"),
  createCompany
);

// Get My Companies
router.get(
  "/",
  protect,
  authorize("recruiter"),
  getMyCompanies
);

// Get Company By Id
router.get(
  "/:id",
  protect,
  getCompanyById
);

// Update Company
router.put(
  "/:id",
  protect,
  authorize("recruiter"),
  updateCompany
);

export default router;