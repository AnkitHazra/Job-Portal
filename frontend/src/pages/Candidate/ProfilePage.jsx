import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 py-8 px-4 sm:px-6 lg:px-8 mt-15 sm:mt-0"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 40 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-1.5 rounded-full bg-linear-to-b from-blue-400 to-indigo-500"
            />
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                My Profile
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-1.5 text-slate-400"
              >
                Manage your professional identity and portfolio
              </motion.p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <motion.div
              whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 shadow-xl shadow-slate-900/50"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Avatar Section */}
                <motion.div variants={itemVariants} className="flex flex-col items-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {formData.profilePicture ? (
                      <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src={formData.profilePicture}
                        alt="profile"
                        className="h-28 w-28 rounded-2xl object-cover shadow-lg ring-2 ring-blue-500/30"
                      />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex h-28 w-28 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 text-4xl font-bold text-white shadow-lg"
                      >
                        {formData.fullName?.charAt(0)?.toUpperCase() || "U"}
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                      className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-1.5 shadow-lg"
                    >
                      <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </motion.div>

                  <motion.h2 variants={itemVariants} className="mt-4 text-xl font-semibold text-white">
                    {formData.fullName || "Welcome, Candidate"}
                  </motion.h2>
                  <motion.p variants={itemVariants} className="mt-1 text-sm text-slate-400">
                    {formData.email || "Add your email"}
                  </motion.p>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                  className="mt-8 rounded-xl bg-slate-800/50 p-4 transition-colors"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">About</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {formData.bio || "Write a brief bio to introduce yourself to potential employers..."}
                  </p>
                </motion.div>

                {/* Skills Section */}
                <motion.div variants={itemVariants} className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Skills</p>
                  <motion.div
                    variants={containerVariants}
                    className="mt-3 flex flex-wrap gap-2"
                  >
                    {formData.skills
                      ?.split(",")
                      .filter(Boolean)
                      .map((skill, index) => (
                        <motion.span
                          key={index}
                          variants={skillVariants}
                          whileHover="hover"
                          className="rounded-lg bg-linear-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-300 cursor-default"
                        >
                          {skill.trim()}
                        </motion.span>
                      )) || (
                        <motion.p variants={itemVariants} className="text-sm text-slate-500">
                          No skills added yet
                        </motion.p>
                      )}
                  </motion.div>
                </motion.div>

                {/* Contact Details */}
                <motion.div variants={containerVariants} className="mt-6 space-y-4">
                  {[
                    {
                      icon: (
                        <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      ),
                      bgColor: "bg-blue-500/10",
                      label: "Phone",
                      value: formData.phone || "Not Added",
                    },
                    {
                      icon: (
                        <svg className="h-4 w-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                      bgColor: "bg-green-500/10",
                      label: "Location",
                      value: formData.location || "Not Added",
                    },
                    {
                      icon: (
                        <svg className="h-4 w-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ),
                      bgColor: "bg-purple-500/10",
                      label: "Resume",
                      value: formData.resumeUrl ? "Uploaded ✓" : "Not Uploaded",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 5, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                      className="flex items-center space-x-3 rounded-lg bg-slate-800/50 p-3 transition-colors"
                    >
                      <div className={`rounded-lg ${item.bgColor} p-2`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{item.label}</p>
                        <p className={`text-sm ${item.label === "Resume" && formData.resumeUrl ? "text-emerald-400" : item.label === "Resume" ? "text-rose-400" : "text-slate-300"}`}>
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Progress Bar */}
                <motion.div variants={itemVariants} className="mt-8 rounded-xl bg-slate-800/50 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-slate-300">Profile Completion</p>
                    <motion.span
                      key={completionPercentage}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`text-sm font-bold bg-linear-to-r ${getCompletionColor(completionPercentage)} bg-clip-text text-transparent`}
                    >
                      {completionPercentage}%
                    </motion.span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                      className={`h-full rounded-full bg-linear-to-r ${getCompletionColor(completionPercentage)}`}
                    />
                  </div>

                  <motion.div
                    variants={containerVariants}
                    className="mt-4 grid grid-cols-2 gap-2 text-xs"
                  >
                    {[
                      { label: "Name", done: !!formData.fullName },
                      { label: "Email", done: !!formData.email },
                      { label: "Phone", done: !!formData.phone },
                      { label: "Skills", done: !!formData.skills },
                      { label: "Photo", done: !!formData.profilePicture },
                      { label: "Resume", done: !!formData.resumeUrl },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center space-x-2"
                      >
                        <motion.div
                          animate={{
                            scale: item.done ? [1, 1.3, 1] : 1,
                            backgroundColor: item.done ? "#34d399" : "#475569",
                          }}
                          transition={{ duration: 0.5, delay: 0.2 * index }}
                          className="w-1.5 h-1.5 rounded-full"
                        />
                        <motion.span
                          animate={{ color: item.done ? "#34d399" : "#64748b" }}
                          transition={{ duration: 0.5 }}
                        >
                          {item.label}
                        </motion.span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="mt-6 space-y-3">
                  <motion.button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
                  >
                    {isEditing ? "← Back to Profile" : "Edit Profile"}
                  </motion.button>
                  {formData.resumeUrl && (
                    <motion.a
                      href={formData.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(51, 65, 85, 0.8)" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:text-white"
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Resume
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Edit Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.form
                  key="edit-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 shadow-xl shadow-slate-900/50"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between mb-8"
                  >
                    <h2 className="text-2xl font-semibold text-white">Edit Profile</h2>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400"
                    >
                      Editing Mode
                    </motion.span>
                  </motion.div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {/* Personal Information */}
                    <motion.div variants={itemVariants}>
                      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-400">
                        Personal Information
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <motion.div whileHover={{ scale: 1.01 }}>
                          <label className="mb-1.5 block text-xs font-medium text-slate-400">Full Name</label>
                          <motion.input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            whileFocus={{ scale: 1.01 }}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.01 }}>
                          <label className="mb-1.5 block text-xs font-medium text-slate-400">Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                          />
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.01 }}>
                          <label className="mb-1.5 block text-xs font-medium text-slate-400">Phone</label>
                          <motion.input
                            type="text"
                            name="phone"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            whileFocus={{ scale: 1.01 }}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.01 }}>
                          <label className="mb-1.5 block text-xs font-medium text-slate-400">Location</label>
                          <motion.input
                            type="text"
                            name="location"
                            placeholder="New York, NY"
                            value={formData.location}
                            onChange={handleChange}
                            whileFocus={{ scale: 1.01 }}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Professional Information */}
                    <motion.div variants={itemVariants}>
                      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-400">
                        Professional Information
                      </h3>
                      <div className="space-y-4">
                        <motion.div whileHover={{ scale: 1.01 }}>
                          <label className="mb-1.5 block text-xs font-medium text-slate-400">Bio</label>
                          <motion.textarea
                            rows="4"
                            name="bio"
                            placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                            value={formData.bio}
                            onChange={handleChange}
                            whileFocus={{ scale: 1.01 }}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                          />
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.01 }}>
                          <label className="mb-1.5 block text-xs font-medium text-slate-400">Skills</label>
                          <motion.input
                            type="text"
                            name="skills"
                            placeholder="React, Node.js, TypeScript, MongoDB"
                            value={formData.skills}
                            onChange={handleChange}
                            whileFocus={{ scale: 1.01 }}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                          <p className="mt-1.5 text-xs text-slate-500">Separate skills with commas</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Media Uploads */}
                    <motion.div variants={itemVariants}>
                      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-400">
                        Media Uploads
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <motion.div
                          whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                          className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 transition-colors"
                        >
                          <label className="mb-3 block text-xs font-medium text-slate-400">Profile Picture</label>
                          {formData.profilePicture && (
                            <motion.img
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              src={formData.profilePicture}
                              alt="preview"
                              className="mb-3 h-20 w-20 rounded-lg object-cover ring-2 ring-blue-500/20"
                            />
                          )}
                          <motion.label
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex cursor-pointer items-center rounded-lg bg-linear-to-r from-blue-500 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-blue-600 hover:to-indigo-700"
                          >
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
                          </motion.label>
                        </motion.div>

                        <motion.div
                          whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                          className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 transition-colors"
                        >
                          <label className="mb-3 block text-xs font-medium text-slate-400">Resume</label>
                          <motion.label
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex cursor-pointer items-center rounded-lg bg-linear-to-r from-purple-500 to-pink-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-purple-600 hover:to-pink-700"
                          >
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
                          </motion.label>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 flex items-center justify-end space-x-4"
                  >
                    <motion.button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition-all"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={!isLoading ? { scale: 1.05 } : {}}
                      whileTap={!isLoading ? { scale: 0.95 } : {}}
                      className="rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center"
                        >
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Saving...
                        </motion.span>
                      ) : (
                        "Save Changes"
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 shadow-xl shadow-slate-900/50 flex items-center justify-center h-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/10 to-indigo-500/10"
                    >
                      <svg className="h-10 w-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </motion.div>
                    <h3 className="text-lg font-medium text-slate-300">Edit Your Profile</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Click the "Edit Profile" button to update your information
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfilePage;