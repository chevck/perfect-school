import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  marks: number;
}

interface StudentAnswer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  marks: number;
}

const StudentExamView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<StudentAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [examDetails, setExamDetails] = useState<any>(null);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Check if student is authenticated
    const storedStudentInfo = sessionStorage.getItem("currentExamStudent");
    // if (!storedStudentInfo) {
    //   // Redirect to login if not authenticated
    //   navigate(`/take-exam/${id}`);
    //   return;
    // }

    setStudentInfo(JSON.parse(storedStudentInfo));

    // Load examination details and questions
    const fetchExamData = () => {
      try {
        // Load examination details
        const savedDetails = localStorage.getItem(`exam-${id}-details`);
        if (savedDetails) {
          setExamDetails(JSON.parse(savedDetails));
        }

        // Load questions
        const savedQuestions = localStorage.getItem(`exam-${id}-questions`);
        if (savedQuestions) {
          setQuestions(JSON.parse(savedQuestions));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading examination data:", error);
        setLoading(false);
      }
    };

    fetchExamData();
  }, [id, navigate]);

  // Timer countdown
  useEffect(() => {
    if (loading || examSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, examSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return; // Prevent selection during feedback
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selectedOption === currentQuestion.correctOption;

    // Save answer
    const answer: StudentAnswer = {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect: isAnswerCorrect,
      marks: isAnswerCorrect ? currentQuestion.marks : 0,
    };

    setAnswers([...answers, answer]);

    // Show feedback
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    // Move to next question after delay
    // setTimeout(() => {
    //   setShowFeedback(false);
    //   setSelectedOption(null);

    //   if (currentQuestionIndex < questions.length - 1) {
    //     setCurrentQuestionIndex(currentQuestionIndex + 1);
    //   } else {
    //     setShowResult(true);
    //   }
    // }, 1500);
  };

  const handleSubmitExam = () => {
    // Calculate score
    const totalScore = answers.reduce((sum, answer) => sum + answer.marks, 0);
    const totalPossibleScore = questions.reduce((sum, q) => sum + q.marks, 0);
    const percentage = Math.round((totalScore / totalPossibleScore) * 100);

    // In a real app, this would be sent to a backend
    // For now, we'll update the student's status in localStorage
    try {
      const savedDetails = localStorage.getItem(`exam-${id}-details`);
      if (savedDetails && studentInfo) {
        const examData = JSON.parse(savedDetails);
        const students = examData.students || [];

        // Find and update student
        const updatedStudents = students.map((s: any) => {
          if (s.id === studentInfo.id || s.email === studentInfo.email) {
            return {
              ...s,
              status: "completed",
              score: percentage,
              completedAt: new Date().toISOString(),
            };
          }
          return s;
        });

        // Save updated data
        examData.students = updatedStudents;
        localStorage.setItem(`exam-${id}-details`, JSON.stringify(examData));
      }
    } catch (error) {
      console.error("Error saving exam results:", error);
    }

    setExamSubmitted(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading examination...</p>
        </div>
      </div>
    );
  }

  if (examSubmitted || showResult) {
    // Calculate score
    const totalScore = answers.reduce((sum, answer) => sum + answer.marks, 0);
    const totalPossibleScore = questions.reduce((sum, q) => sum + q.marks, 0);
    const percentage = Math.round((totalScore / totalPossibleScore) * 100);
    const correctAnswers = answers.filter((a) => a.isCorrect).length;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-3xl font-bold text-blue-600">
                {percentage}%
              </span>
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Examination Completed!
            </h1>

            <p className="text-gray-600">
              Thank you for completing the {examDetails?.subject} examination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Score</p>
              <p className="text-xl font-semibold">
                {totalScore} / {totalPossibleScore} points
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Correct Answers</p>
              <p className="text-xl font-semibold">
                {correctAnswers} / {questions.length} questions
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with progress and timer */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex justify-between items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <Progress value={progress} className="h-2 mt-1" />
          </div>

          <div className="ml-4 px-4 py-2 bg-blue-100 rounded-full flex items-center">
            <svg
              className="w-5 h-5 text-blue-600 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="font-medium text-blue-800">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {currentQuestion.text}
            </h2>
            <p className="text-sm text-gray-500">
              {currentQuestion.marks}{" "}
              {currentQuestion.marks === 1 ? "point" : "points"}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {currentQuestion.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    showFeedback
                      ? index === currentQuestion.correctOption
                        ? "border-green-500 bg-green-50"
                        : index === selectedOption
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      : selectedOption === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        showFeedback
                          ? index === currentQuestion.correctOption
                            ? "bg-green-500 text-white"
                            : index === selectedOption
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          : selectedOption === index
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-800">{option}</span>

                    {showFeedback &&
                      index === currentQuestion.correctOption && (
                        <svg
                          className="w-5 h-5 text-green-500 ml-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}

                    {showFeedback &&
                      index === selectedOption &&
                      index !== currentQuestion.correctOption && (
                        <svg
                          className="w-5 h-5 text-red-500 ml-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Feedback message */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg mb-6 text-center ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {isCorrect ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Correct! Well done!
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  Not quite right. The correct answer is{" "}
                  {String.fromCharCode(65 + currentQuestion.correctOption)}.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (
                confirm("Are you sure you want to submit your examination?")
              ) {
                handleSubmitExam();
              }
            }}
          >
            Submit Exam
          </Button>

          <Button
            onClick={handleNextQuestion}
            disabled={selectedOption === null || showFeedback}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
          >
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "Finish Exam"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentExamView;
