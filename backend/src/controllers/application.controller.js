import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

//apply to a job

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const existingApplication =
      await Application.findOne({
        applicant: req.user._id,
        job: jobId,
      });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message:
          "You have already applied for this job",
      });
    }

    const application =
      await Application.create({
        applicant: req.user._id,
        job: jobId,
      });

    return res.status(201).json({
      success: true,
      message: "Application submitted",
      application,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
//Get My Applications

export const getMyApplications =
  async (req, res) => {
    try {
      const applications =
        await Application.find({
          applicant: req.user._id,
        })
          .populate({
            path: "job",
            populate: {
              path: "company",
            },
          })
          .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

//Get Applicants For A Job

export const getApplicantsForJob =
  async (req, res) => {
    try {

      const job =
        await Job.findById(
          req.params.jobId
        );

      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }

      if (
        job.createdBy.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const applications =
        await Application.find({
          job: req.params.jobId,
        })
          .populate(
            "applicant",
            "-password"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        applications,
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

//Update Application Status

export const updateApplicationStatus =
  async (req, res) => {
    try {
      const { status } = req.body;

      const application =
        await Application.findById(
          req.params.applicationId
        );

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }

      application.status = status;

      await application.save();

      return res.status(200).json({
        success: true,
        message:
          "Application status updated",
        application,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

// get all application
export const getAllApplications =
  async (req, res) => {
    try {

      const jobs =
        await Job.find({
          createdBy: req.user._id,
        });

      const jobIds =
        jobs.map(
          (job) => job._id
        );

      const applications =
        await Application.find({
          job: {
            $in: jobIds,
          },
        })
          .populate(
            "applicant",
            "-password"
          )
          .populate({
            path: "job",
            populate: {
              path: "company",
            },
          })
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        applications,
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

export const getRecruiterJobs =
  async (req, res) => {
    try {

      const jobs =
        await Job.find({
          createdBy: req.user._id,
        }).populate("company");

      res.status(200).json({
        success: true,
        jobs,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };


export const getRecruiterAnalytics =
  async (req, res) => {
    try {

      const jobs =
        await Job.find({
          createdBy: req.user._id,
        });

      const jobIds =
        jobs.map(
          (job) => job._id
        );

      const applications =
        await Application.find({
          job: {
            $in: jobIds,
          },
        });

      const recentApplications =
  await Application.find({
    job: {
      $in: jobIds,
    },
  })
    .populate(
      "applicant",
      "-password"
    )
    .populate("job")
    .sort({
      createdAt: -1,
    })
    .limit(5);

const analytics = {
  totalJobs: jobs.length,

  totalApplications:
    applications.length,

  pending:
    applications.filter(
      (app) =>
        app.status ===
        "pending"
    ).length,

  shortlisted:
    applications.filter(
      (app) =>
        app.status ===
        "shortlisted"
    ).length,

  rejected:
    applications.filter(
      (app) =>
        app.status ===
        "rejected"
    ).length,

  recentApplications,
};

      return res.status(200).json({
        success: true,
        analytics,
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };