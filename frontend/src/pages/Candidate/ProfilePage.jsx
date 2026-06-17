import { useState, useEffect } from "react";
import { getCurrentUser, updateProfile } from "../../api/authApi";
import { uploadFile } from "../../api/uploadApi";

function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: "",
    resumeUrl: "",
    profilePicture: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await getCurrentUser();
      const user = data.user;

      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        skills: user.skills?.join(", ") || "",
        resumeUrl: user.resumeUrl || "",
        profilePicture: user.profilePicture || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile(formData);
      alert("Profile Updated Successfully");
      fetchProfile();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const completedFields = [
    formData.fullName,
    formData.email,
    formData.phone,
    formData.skills,
    formData.resumeUrl,
    formData.profilePicture,
  ].filter(Boolean).length;

  const completionPercentage = Math.round((completedFields / 6) * 100);

  const handleResumeUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const data = await uploadFile(file);

      setFormData((prev) => ({
        ...prev,
        resumeUrl: data.url,
      }));

      alert("Resume uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfilePictureUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const data = await uploadFile(file);

      setFormData((prev) => ({
        ...prev,
        profilePicture: data.url,
      }));

      alert("Profile picture uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const getCompletionColor = (percentage) => {
    if (percentage === 100) return "from-emerald-400 to-green-500";
    if (percentage >= 66) return "from-blue-400 to-indigo-500";
    if (percentage >= 33) return "from-amber-400 to-orange-500";
    return "from-rose-400 to-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-8 px-4 sm:px-6 lg:px-8 mt-15 sm:mt-0"  >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-1.5 rounded-full bg-gradient-to-b from-blue-400 to-indigo-500" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                My Profile
              </h1>
              <p className="mt-1.5 text-slate-400">Manage your professional identity and portfolio</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 shadow-xl shadow-slate-900/50">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt="profile"
                      className="h-28 w-28 rounded-2xl object-cover shadow-lg ring-2 ring-blue-500/30"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl font-bold text-white shadow-lg">
                      {formData.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-1.5 shadow-lg">
                    <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <h2 className="mt-4 text-xl font-semibold text-white">
                  {formData.fullName || "Welcome, Candidate"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">{formData.email || "Add your email"}</p>
              </div>

              {/* Bio Section */}
              <div className="mt-8 rounded-xl bg-slate-800/50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">About</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {formData.bio || "Write a brief bio to introduce yourself to potential employers..."}
                </p>
              </div>

              {/* Skills Section */}
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Skills</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.skills
                    ?.split(",")
                    .filter(Boolean)
                    .map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-300"
                      >
                        {skill.trim()}
                      </span>
                    )) || (
                    <p className="text-sm text-slate-500">No skills added yet</p>
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3 rounded-lg bg-slate-800/50 p-3">
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm text-slate-300">{formData.phone || "Not Added"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 rounded-lg bg-slate-800/50 p-3">
                  <div className="rounded-lg bg-green-500/10 p-2">
                    <svg className="h-4 w-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-sm text-slate-300">{formData.location || "Not Added"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 rounded-lg bg-slate-800/50 p-3">
                  <div className="rounded-lg bg-purple-500/10 p-2">
                    <svg className="h-4 w-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Resume</p>
                    <p className="text-sm text-slate-300">
                      {formData.resumeUrl ? (
                        <span className="text-emerald-400">Uploaded ✓</span>
                      ) : (
                        <span className="text-rose-400">Not Uploaded</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8 rounded-xl bg-slate-800/50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-slate-300">Profile Completion</p>
                  <span className={`text-sm font-bold bg-gradient-to-r ${getCompletionColor(completionPercentage)} bg-clip-text text-transparent`}>
                    {completionPercentage}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/50">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getCompletionColor(completionPercentage)} transition-all duration-500 ease-out`}
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: "Name", done: !!formData.fullName },
                    { label: "Email", done: !!formData.email },
                    { label: "Phone", done: !!formData.phone },
                    { label: "Skills", done: !!formData.skills },
                    { label: "Photo", done: !!formData.profilePicture },
                    { label: "Resume", done: !!formData.resumeUrl },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.done ? "bg-emerald-400" : "bg-slate-600"}`} />
                      <span className={item.done ? "text-emerald-400" : "text-slate-500"}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
                >
                  {isEditing ? "← Back to Profile" : "Edit Profile"}
                </button>
                {formData.resumeUrl && (
                  <a
                    href={formData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-slate-700/80 hover:text-white"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Resume
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-3">
            {isEditing ? (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 shadow-xl shadow-slate-900/50"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-white">Edit Profile</h2>
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    Editing Mode
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-400">
                      Personal Information
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-400">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-400">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          disabled
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-400">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-400">Location</label>
                        <input
                          type="text"
                          name="location"
                          placeholder="New York, NY"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-400">
                      Professional Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-400">Bio</label>
                        <textarea
                          rows="4"
                          name="bio"
                          placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                          value={formData.bio}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-400">Skills</label>
                        <input
                          type="text"
                          name="skills"
                          placeholder="React, Node.js, TypeScript, MongoDB"
                          value={formData.skills}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        <p className="mt-1.5 text-xs text-slate-500">Separate skills with commas</p>
                      </div>
                    </div>
                  </div>

                  {/* Media Uploads */}
                  <div>
                    <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-400">
                      Media Uploads
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                        <label className="mb-3 block text-xs font-medium text-slate-400">Profile Picture</label>
                        {formData.profilePicture && (
                          <img
                            src={formData.profilePicture}
                            alt="preview"
                            className="mb-3 h-20 w-20 rounded-lg object-cover ring-2 ring-blue-500/20"
                          />
                        )}
                        <label className="inline-flex cursor-pointer items-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-blue-600 hover:to-indigo-700">
                          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                        <label className="mb-3 block text-xs font-medium text-slate-400">Resume</label>
                        <label className="inline-flex cursor-pointer items-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-purple-600 hover:to-pink-700">
                          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Upload PDF
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleResumeUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 shadow-xl shadow-slate-900/50 flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                    <svg className="h-10 w-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-300">Edit Your Profile</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Click the "Edit Profile" button to update your information
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;