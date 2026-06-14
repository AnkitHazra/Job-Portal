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

    try {
      await updateProfile(formData);

      alert("Profile Updated Successfully");

      fetchProfile();
    } catch (error) {
      console.log(error);
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

  return (
    <div className="mx-auto max-w-5xl">
    <div className="w-full max-w-none">
      <h1 className="text-4xl font-bold text-white">My Profile</h1>

      <p className="mt-2 text-slate-400">Manage your professional profile.</p>

      <div className="mt-8">
        {/* Profile Card */}
        
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 mt-5 max-w-5xl">
          <div className="flex flex-col items-center">
            {formData.profilePicture ? (
              <img
                src={formData.profilePicture}
                alt="profile"
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
                {formData.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <h2 className="mt-4 text-2xl font-bold text-white">
              {formData.fullName || "Candidate"}
            </h2>

            <p className="text-slate-400">{formData.email}</p>
          </div>
          <div className="mt-8">
            <p className="text-slate-500">Bio</p>

            <p className="mt-2 text-white">
              {formData.bio || "No bio added yet"}
            </p>
          </div>
          <div className="mt-8">
            <p className="text-slate-500">Skills</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills
                ?.split(",")
                .filter(Boolean)
                .map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-400"
                  >
                    {skill.trim()}
                  </span>
                ))}
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div>
              <p className="text-sm text-slate-500">Phone</p>

              <p className="text-white">{formData.phone || "Not Added"}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Location</p>

              <p className="text-white">{formData.location || "Not Added"}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Resume</p>

              <p className="text-white">
                {formData.resumeUrl ? "Uploaded ✅" : "Not Uploaded ❌"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Profile Picture</p>

              <p className="text-white">
                {formData.profilePicture ? "Uploaded ✅" : "Not Uploaded ❌"}
              </p>
            </div>
          </div>

          {/* Profile Completion */}

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Profile Completion</h3>

              <span className="text-blue-400">{completionPercentage}%</span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${completionPercentage}%`,
                }}
              />
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <p className="text-green-400">
                {formData.fullName ? "✓" : "✗"} Name
              </p>

              <p className="text-green-400">
                {formData.email ? "✓" : "✗"} Email
              </p>

              <p className={formData.phone ? "text-green-400" : "text-red-400"}>
                {formData.phone ? "✓" : "✗"} Phone
              </p>

              <p
                className={formData.skills ? "text-green-400" : "text-red-400"}
              >
                {formData.skills ? "✓" : "✗"} Skills
              </p>

              <p
                className={
                  formData.profilePicture ? "text-green-400" : "text-red-400"
                }
              >
                {formData.profilePicture ? "✓" : "✗"} Profile Picture
              </p>
              {formData.resumeUrl ? (
                <a
                  href={formData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700"
                >
                  View Resume
                </a>
              ) : (
                <p className="text-red-400">Not Uploaded ❌</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 mt-3"
            >
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3"></div>
        {/* Edit Form */}
        {isEditing && (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-8 lg:col-span-2"
          >
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Edit Profile
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />

              <input
                type="email"
                value={formData.email}
                disabled
                className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-slate-400"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />
            </div>

            <textarea
              rows="4"
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />

            <input
              type="text"
              name="skills"
              placeholder="React, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleChange}
              className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />

            <div className="mt-6">
              <label className="mb-2 block text-slate-300">
                Profile Picture
              </label>
              {formData.profilePicture && (
                <img
                  src={formData.profilePicture}
                  alt="preview"
                  className="mb-4 h-24 w-24 rounded-full object-cover"
                />
              )}
              <label className="inline-flex cursor-pointer rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
                Upload Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
              </label>
              {formData.profilePicture && (
                <p className="mt-2 text-green-400">
                  Profile Picture Uploaded ✓
                </p>
              )}
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-slate-300">Resume PDF</label>

              <label className="inline-flex cursor-pointer rounded-xl bg-purple-600 px-5 py-3 text-white hover:bg-purple-700">
                Upload Resume PDF
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>
              {formData.resumeUrl && (
                <p className="mt-2 text-green-400">
                  Resume Uploaded Successfully ✓
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Save Profile
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
}

export default ProfilePage;
