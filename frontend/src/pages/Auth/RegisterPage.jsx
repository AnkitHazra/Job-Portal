import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RegisterPage() {
    const navigate = useNavigate();

    const { register } = useAuth();

    const [formData, setFormData] =
        useState({
            fullName: "",
            email: "",
            password: "",
            role: "candidate",
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        try {
            await register(formData);

            navigate("/login");
        } catch (error) {
            alert(
                error.response?.data
                    ?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#020617] px-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8"
            >
                <h1 className="mb-6 text-center text-3xl font-bold text-white">
                    Create Account
                </h1>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="mb-4 w-full rounded-xl bg-slate-800 p-3 text-white"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="mb-4 w-full rounded-xl bg-slate-800 p-3 text-white"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="mb-4 w-full rounded-xl bg-slate-800 p-3 text-white"
                />

                <select
                    name="role"
                    onChange={handleChange}
                    className="mb-6 w-full rounded-xl bg-slate-800 p-3 text-white"
                >
                    <option value="candidate">
                        Candidate
                    </option>

                    <option value="recruiter">
                        Recruiter
                    </option>
                </select>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;