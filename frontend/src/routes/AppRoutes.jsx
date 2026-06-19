import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import CandidateDashboard from "../pages/Candidate/CandidateDashboard";
import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";
import CompaniesPage from "../pages/Recruiter/CompaniesPage";
import CreateCompanyPage from "../pages/Recruiter/CreateCompanyPage";
import CreateJobPage from "../pages/Recruiter/CreateJobPage";
import RecruiterJobsPage from "../pages/Recruiter/JobsPage";
import CandidateJobsPage from "../pages/Candidate/JobsPage";
import JobDetailsPage from "../pages/Candidate/JobDetailsPage";
import MyApplications from "../pages/Candidate/MyApplications"
import ProfilePage from "../pages/Candidate/ProfilePage";
import CandidateLayout from "../components/layout/CandidateLayout";
import ApplicantsPage from "../pages/Recruiter/ApplicantsPage";
import ApplicationsPage from "../pages/Recruiter/ApplicationsPage";
import EditJobPage from "../pages/Recruiter/EditJobPage";
import ATSScore from "../pages/Candidate/ATSscore";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />


      {/* recruiter dashboard */}
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={[
              "recruiter",
            ]}
          >
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      {/* recruiter companies */}
      <Route
        path="/recruiter/companies"
        element={
          <ProtectedRoute
            allowedRoles={["recruiter"]}
          >
            <CompaniesPage />
          </ProtectedRoute>
        }
      />
      {/* recruiter company create */}
      <Route
        path="/recruiter/company/create"
        element={
          <ProtectedRoute
            allowedRoles={["recruiter"]}
          >
            <CreateCompanyPage />
          </ProtectedRoute>
        }
      />
      {/* recruiter job create */}
      <Route
        path="/recruiter/job/create"
        element={
          <ProtectedRoute
            allowedRoles={["recruiter"]}
          >
            <CreateJobPage />
          </ProtectedRoute>
        }
      />
      {/* recruiter view jobs */}
      <Route
        path="/recruiter/jobs"
        element={
          <ProtectedRoute
            allowedRoles={["recruiter"]}
          >
            <RecruiterJobsPage />
          </ProtectedRoute>
        }
      />
      {/* candidate view jobs  */}
      <Route
        path="/jobs"
        element={
          <CandidateLayout>
            <CandidateJobsPage />
          </CandidateLayout>
        }
      />
      {/* job details   page  */}
      <Route path="/jobs/:id" element={<CandidateLayout>
        <JobDetailsPage />
      </CandidateLayout>} />



      {/* candidate dashboard */}
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateLayout>
              <CandidateDashboard />
            </CandidateLayout>
          </ProtectedRoute>
        }
      />
      {/* candidate applications */}

      <Route
        path="/candidate/applications"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateLayout>
              <MyApplications />
            </CandidateLayout>
          </ProtectedRoute>
        }
      />
      {/* Candidate profile */}
      <Route
        path="/candidate/profile"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateLayout>
              <ProfilePage />
            </CandidateLayout>
          </ProtectedRoute>
        }
      />
      {/* recruiter view application */}
      <Route
        path="/recruiter/jobs/:jobId/applicants"
        element={
          <ProtectedRoute
            allowedRoles={[
              "recruiter",
            ]}
          >
            <ApplicantsPage />
          </ProtectedRoute>
        }
      />
      {/* get all applications */}
      <Route
        path="/recruiter/applications"
        element={
          <ProtectedRoute
            allowedRoles={[
              "recruiter",
            ]}
          >
            <ApplicationsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/job/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <EditJobPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/ats-score"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateLayout>
              <ATSScore />
            </CandidateLayout>
          </ProtectedRoute>
        }
      />
      {/* page not found */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>


  );
}

export default AppRoutes;