import Job from "../models/job.model.js";
import Company from "../models/company.model.js";

//create job

export const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            experienceLevel,
            jobType,
            position,
            companyId,
        } = req.body;

        if (
            !title ||
            !description ||
            !salary ||
            !location ||
            !experienceLevel ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            salary,
            location,
            experienceLevel,
            jobType,
            position,
            company: companyId,
            createdBy: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Job created successfully",
            job,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

//Get All Jobs

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            jobs,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

//Get Job By ID
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(
            req.params.id
        ).populate("company");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        return res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

//Update Job

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

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

        const updatedJob =
            await Job.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job: updatedJob,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Delete Job

export const deleteJob = async (req, res) => {
  try {

    const job = await Job.findById(
      req.params.id
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

    await Job.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Job deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};