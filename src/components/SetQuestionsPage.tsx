import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  MessageSquare,
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  marks: number;
  status?: "pending" | "approved" | "rejected" | "needs_revision";
  reviewNotes?: string;
  createdBy?: string;
  createdAt?: string;
}

interface ExaminationDetails {
  id: string;
  subject: string;
  class: string;
  term: string;
  totalMarks: number;
  session: string;
}

const SetQuestionsPage = () => {
  // In a real application, you would fetch this data based on the examination ID from the URL
  const [examinationDetails] = useState<ExaminationDetails>(() => {
    // Try to load from localStorage first
    const savedDetails = localStorage.getItem(`exam-${"1"}-details`);
    return savedDetails
      ? JSON.parse(savedDetails)
      : {
          id: "1",
          subject: "Mathematics",
          class: "Grade 10",
          term: "First Term",
          totalMarks: 100,
          session: "2023/2024",
        };
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    // Load questions from localStorage if available
    const savedQuestions = localStorage.getItem(`exam-${"1"}-questions`);
    const parsedQuestions = savedQuestions ? JSON.parse(savedQuestions) : [];
    // Add review status to existing questions if not present
    return parsedQuestions.map((q: Question) => ({
      ...q,
      status: q.status || "pending",
      createdBy: q.createdBy || "Current User",
      createdAt: q.createdAt || new Date().toISOString(),
    }));
  });
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [questionText, setQuestionText] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctOption: string;
    marks: number;
  }>({
    defaultValues: {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctOption: "0",
      marks: 5,
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: any) => {
    if (!questionText.trim()) {
      alert("Question text is required");
      return;
    }

    const newQuestion: Question = {
      id:
        isEditing && editIndex !== null
          ? questions[editIndex].id
          : Math.random().toString(36).substring(2, 9),
      text: questionText,
      options: [data.option1, data.option2, data.option3, data.option4],
      correctOption: parseInt(data.correctOption),
      marks: data.marks,
      status:
        isEditing && editIndex !== null
          ? questions[editIndex].status
          : "pending",
      createdBy: "Current User",
      createdAt:
        isEditing && editIndex !== null
          ? questions[editIndex].createdAt
          : new Date().toISOString(),
    };

    if (isEditing && editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setIsEditing(false);
      setEditIndex(null);
      setCurrentQuestion(null);
    } else {
      setQuestions([...questions, newQuestion]);
      // Set the current question to the newly added question
      setCurrentQuestion(newQuestion);
    }

    // Save to localStorage for persistence
    localStorage.setItem(
      `exam-${examinationDetails.id}-questions`,
      JSON.stringify(
        isEditing && editIndex !== null
          ? [
              ...questions.slice(0, editIndex),
              newQuestion,
              ...questions.slice(editIndex + 1),
            ]
          : [...questions, newQuestion],
      ),
    );

    reset();
    setQuestionText("");
  };

  const handleEditQuestion = (index: number) => {
    const question = questions[index];
    setQuestionText(question.text);
    setValue("option1", question.options[0]);
    setValue("option2", question.options[1]);
    setValue("option3", question.options[2]);
    setValue("option4", question.options[3]);
    setValue("correctOption", question.correctOption.toString());
    setValue("marks", question.marks);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);

    // Save updated questions to localStorage
    localStorage.setItem(
      `exam-${examinationDetails.id}-questions`,
      JSON.stringify(updatedQuestions),
    );

    // If currently editing this question, reset the form
    if (isEditing && editIndex === index) {
      setIsEditing(false);
      setEditIndex(null);
      setCurrentQuestion(null);
      reset();
      setQuestionText("");
    }
  };

  const calculateTotalMarks = () => {
    return questions.reduce((total, question) => total + question.marks, 0);
  };

  const getStatusColor = (status: Question["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "needs_revision":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Question["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "needs_revision":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "pending":
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["formula"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "list",
    "bullet",
    "formula",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Set Questions for Examination
        </h1>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => {
            // In a real application, you would save the questions to the backend
            // For now, we're just using localStorage
            localStorage.setItem(
              `exam-${examinationDetails.id}-questions`,
              JSON.stringify(questions),
            );
            localStorage.setItem(
              `exam-${examinationDetails.id}-details`,
              JSON.stringify(examinationDetails),
            );

            // Show success message
            alert("Examination questions saved successfully!");

            // In a real app, we would redirect to the examinations page
            // window.location.href = "/examinations";
          }}
        >
          Save Examination
        </Button>
      </div>

      {/* Examination Details */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Subject</p>
            <p className="text-lg font-semibold text-gray-900">
              {examinationDetails.subject}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Class</p>
            <p className="text-lg font-semibold text-gray-900">
              {examinationDetails.class}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Term & Session</p>
            <p className="text-lg font-semibold text-gray-900">
              {examinationDetails.term} - {examinationDetails.session}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Questions Added: {questions.length}
            </p>
            <p className="text-sm font-medium text-gray-500">
              Total Marks: {calculateTotalMarks()} /{" "}
              {examinationDetails.totalMarks}
            </p>
          </div>
          {calculateTotalMarks() > examinationDetails.totalMarks && (
            <p className="text-sm font-medium text-red-500">
              Warning: Total marks exceed the examination total marks
            </p>
          )}
        </div>
      </div>

      {/* Add Question Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {isEditing ? "Edit Question" : "Add New Question"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="questionText">Question Text</Label>
            <div className="border border-gray-300 rounded-md">
              <ReactQuill
                theme="snow"
                value={questionText}
                onChange={setQuestionText}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter your question here... Use the toolbar for formatting, including superscripts for expressions like 5²"
                style={{ minHeight: "120px" }}
              />
            </div>
            {!questionText.trim() && (
              <p className="text-sm text-red-500">Question text is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="option1">Option 1</Label>
              <Input
                type="text"
                id="option1"
                {...register("option1", { required: "Option 1 is required" })}
              />
              {errors.option1 && (
                <p className="text-sm text-red-500">{errors.option1.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="option2">Option 2</Label>
              <Input
                type="text"
                id="option2"
                {...register("option2", { required: "Option 2 is required" })}
              />
              {errors.option2 && (
                <p className="text-sm text-red-500">{errors.option2.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="option3">Option 3</Label>
              <Input
                type="text"
                id="option3"
                {...register("option3", { required: "Option 3 is required" })}
              />
              {errors.option3 && (
                <p className="text-sm text-red-500">{errors.option3.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="option4">Option 4</Label>
              <Input
                type="text"
                id="option4"
                {...register("option4", { required: "Option 4 is required" })}
              />
              {errors.option4 && (
                <p className="text-sm text-red-500">{errors.option4.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Correct Option</Label>
            <RadioGroup
              defaultValue="0"
              className="flex flex-wrap gap-4"
              {...register("correctOption", {
                required: "Correct option is required",
              })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="option1-radio" />
                <Label htmlFor="option1-radio">Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="option2-radio" />
                <Label htmlFor="option2-radio">Option 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="option3-radio" />
                <Label htmlFor="option3-radio">Option 3</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="option4-radio" />
                <Label htmlFor="option4-radio">Option 4</Label>
              </div>
            </RadioGroup>
            {errors.correctOption && (
              <p className="text-sm text-red-500">
                {errors.correctOption.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="marks">Marks</Label>
            <Input
              type="number"
              id="marks"
              className="max-w-[100px]"
              {...register("marks", {
                required: "Marks are required",
                min: {
                  value: 1,
                  message: "Marks must be at least 1",
                },
              })}
            />
            {errors.marks && (
              <p className="text-sm text-red-500">{errors.marks.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditIndex(null);
                  reset();
                  setQuestionText("");
                }}
              >
                Cancel Edit
              </Button>
            )}
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {isEditing ? "Update Question" : "Add Question"}
            </Button>
          </div>
        </form>
      </div>

      {/* Questions List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Questions ({questions.length})
        </h2>

        {questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No questions added yet. Use the form above to add questions.
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">
                          Question {index + 1}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({question.marks} marks)
                        </span>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(question.status)}
                          <Badge className={getStatusColor(question.status)}>
                            {question.status?.replace("_", " ").toUpperCase() ||
                              "PENDING"}
                          </Badge>
                        </div>
                      </div>
                      <div
                        className="mt-2 text-gray-800 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: question.text }}
                      />
                      {question.reviewNotes && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">
                                Review Notes:
                              </p>
                              <p className="text-sm text-yellow-700">
                                {question.reviewNotes}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEditQuestion(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteQuestion(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded-md ${optionIndex === question.correctOption ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"}`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${optionIndex === question.correctOption ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
                          >
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span
                            className={`${optionIndex === question.correctOption ? "font-medium text-green-800" : "text-gray-700"}`}
                          >
                            {option}
                          </span>
                          {optionIndex === question.correctOption && (
                            <span className="ml-auto text-xs text-green-600 font-medium">
                              Correct
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetQuestionsPage;
