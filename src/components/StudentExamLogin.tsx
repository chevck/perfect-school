import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const studentLoginSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  password: z.string().min(1, "Password is required"),
});

type StudentLoginFormValues = z.infer<typeof studentLoginSchema>;

const StudentExamLogin = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [examDetails, setExamDetails] = useState<any>(null);

  React.useEffect(() => {
    // Fetch examination details to show on the login page
    const savedDetails = localStorage.getItem(`exam-${id}-details`);
    if (savedDetails) {
      setExamDetails(JSON.parse(savedDetails));
    }
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentLoginFormValues>({
    resolver: zodResolver(studentLoginSchema),
    defaultValues: {
      studentId: "",
      password: "",
    },
  });

  const onSubmit = async (data: StudentLoginFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      // In a real app, this would validate against a backend
      // For now, we'll simulate authentication

      // Check if the examination exists
      const savedDetails = localStorage.getItem(`exam-${id}-details`);
      if (!savedDetails) {
        throw new Error("Examination not found");
      }
      navigate(`/take-exam/${id}/questions`);

      const examData = JSON.parse(savedDetails);
      const students = examData.students || [];

      // Find student by ID (in a real app, would check password too)
      const student = students.find(
        (s: any) =>
          s.id === data.studentId ||
          s.email.toLowerCase() === data.studentId.toLowerCase(),
      );

      // if (!student) {
      //   throw new Error("Student not found for this examination");
      // }

      // // Store student info in session storage for the exam session
      // sessionStorage.setItem(
      //   "currentExamStudent",
      //   JSON.stringify({
      //     id: student.id,
      //     name: student.name,
      //     email: student.email,
      //     examId: id,
      //   }),
      // );

      // Redirect to the exam page
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/take-exam/${id}/questions`);
      }, 1000);
    } catch (err: any) {
      setIsLoading(false);
      setError(
        err.message || "Failed to authenticate. Please check your credentials.",
      );
      console.error("Login error:", err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        {examDetails ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              {examDetails.subject} Examination
            </h1>
            <p className="text-gray-500 text-center mb-6">
              {examDetails.class} • {examDetails.term} • {examDetails.session}
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="studentId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Student ID or Email
                </label>
                <input
                  id="studentId"
                  type="text"
                  {...register("studentId")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your student ID or email"
                  disabled={isLoading}
                />
                {errors.studentId && (
                  <p className="text-red-600 text-sm">
                    {errors.studentId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Verifying...
                    </div>
                  ) : (
                    "Start Examination"
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading examination details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentExamLogin;
