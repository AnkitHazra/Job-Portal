import express from "express";

import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} from "../controllers/job.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("recruiter"),
  createJob
);

router.get(
  "/",
  getAllJobs
);

router.get(
  "/:id",
  getJobById
);

router.put(
  "/:id",
  protect,
  authorize("recruiter"),
  updateJob
);

router.delete(
  "/:id",
  protect,
  deleteJob
);

export default router;