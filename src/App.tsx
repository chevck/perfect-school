import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import Dashboard from "./components/Dashboard";
import SetQuestionsPage from "./components/SetQuestionsPage";
import ExaminationViewPage from "./components/ExaminationViewPage";
import ExaminationReviewPage from "./components/ExaminationReviewPage";
import StudentExamLogin from "./components/StudentExamLogin";
import StudentExamView from "./components/StudentExamView";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/set-questions/:id" element={<SetQuestionsPage />} />
          <Route path="/examination/:id" element={<ExaminationViewPage />} />
          <Route
            path="/review-examination/:id"
            element={<ExaminationReviewPage />}
          />
          <Route path="/take-exam/:id" element={<StudentExamLogin />} />
          <Route
            path="/take-exam/:id/questions"
            element={<StudentExamView />}
          />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
