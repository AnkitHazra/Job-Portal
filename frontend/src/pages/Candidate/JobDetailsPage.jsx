import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    MapPin,
    BriefcaseBusiness,
    IndianRupee,
} from "lucide-react";

import { getJobById } from "../../api/jobApi";
import { applyJob } from "../../api/applicationApi";

function JobDetailsPage() {
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    const fetchJob = async () => {
        try {
            const data = await getJobById(id);

            setJob(data.job);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        try {
            setApplying(true);

            const data = await applyJob(job._id);

            alert(data.message);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Application failed"
            );
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center bg-slate-950 text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className=" bg-slate-950 px-6 py-12">

            <div className="mx-auto max-w-5xl">

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        <div>

                            <h1 className="text-4xl font-bold text-white">
                                {job.title}
                            </h1>

                            <p className="mt-2 text-lg text-slate-400">
                                {job.company?.name}
                            </p>

                        </div>

                        <button
                            onClick={handleApply}
                            disabled={applying}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {applying
                                ? "Applying..."
                                : "Apply Now"}
                        </button>

                    </div>

                    <div className="mt-8 flex flex-wrap gap-6 text-slate-300">

                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            {job.location}
                        </div>

                        <div className="flex items-center gap-2">
                            <BriefcaseBusiness size={18} />
                            {job.experienceLevel} Years
                        </div>

                        <div className="flex items-center gap-2">
                            <IndianRupee size={18} />
                            ₹
                            {job.salary?.toLocaleString()}
                        </div>

                    </div>

                    <div className="mt-10">

                        <h2 className="text-2xl font-semibold text-white">
                            Job Description
                        </h2>

                        <p className="mt-4 leading-8 text-slate-400">
                            {job.description}
                        </p>

                    </div>

                    <div className="mt-10">

                        <h2 className="text-2xl font-semibold text-white">
                            Requirements
                        </h2>

                        <div className="mt-4 flex flex-wrap gap-3">

                            {job.requirements?.map(
                                (req, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-slate-800 px-4 py-2 text-slate-300"
                                    >
                                        {req}
                                    </span>
                                )
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default JobDetailsPage;