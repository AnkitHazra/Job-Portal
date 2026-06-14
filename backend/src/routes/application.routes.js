import express from "express";

import {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  getAllApplications,
  getRecruiterJobs,
  getRecruiterAnalytics
} from "../controllers/application.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/apply/:jobId",
  protect,
  authorize("candidate"),
  applyJob
);

router.get(
  "/my-applications",
  protect,
  authorize("candidate"),
  getMyApplications
);

router.get(
  "/job/:jobId",
  protect,
  authorize("recruiter"),
  getApplicantsForJob
);

router.put(
  "/:applicationId/status",
  protect,
  authorize("recruiter"),
  updateApplicationStatus
);

router.get(
  "/all",
  protect,
  getAllApplications
);

router.get(
  "/my-jobs",
  protect,
  getRecruiterJobs
);

router.get(
  "/analytics",
  protect,
  getRecruiterAnalytics
);

export default router;