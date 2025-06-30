import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Eye,
  AlertTriangle,
  Clock,
  User,
  Calendar,
  BookOpen,
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  marks: number;
  status: "pending" | "approved" | "rejected" | "needs_revision";
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
  teacher: string;
  date: string;
  status: "draft" | "under_review" | "approved" | "published";
}

interface QuestionFormData {
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  marks: number;
}

const ExaminationReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [examination, setExamination] = useState<ExaminationDetails | null>(
    null,
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [reviewNotes, setReviewNotes] = useState<string>("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<QuestionFormData>({
    defaultValues: {
      questionText: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctOption: "0",
      marks: 5,
    },
  });

  useEffect(() => {
    loadExaminationData();
  }, [id]);

  const loadExaminationData = () => {
    setLoading(true);
    try {
      // Load examination details
      const savedDetails = localStorage.getItem(`exam-${id}-details`);
      const examData = savedDetails
        ? JSON.parse(savedDetails)
        : {
            id: id || "1",
            subject: "Mathematics",
            class: "Grade 10",
            term: "First Term",
            totalMarks: 100,
            session: "2023/2024",
            teacher: "John Smith",
            date: "2023-06-15",
            status: "under_review",
          };

      setExamination(examData);

      // Load questions with review status
      const savedQuestions = localStorage.getItem(`exam-${id}-questions`);
      const questionsData = savedQuestions ? JSON.parse(savedQuestions) : [];

      // Add review status to questions if not present
      const questionsWithStatus = questionsData.map((q: Question) => ({
        ...q,
        status: q.status || "pending",
        createdBy: q.createdBy || "John Smith",
        createdAt: q.createdAt || new Date().toISOString(),
      }));

      setQuestions(questionsWithStatus);
    } catch (error) {
      console.error("Error loading examination data:", error);
    } finally {
      setLoading(false);
    }
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

  const handleQuestionAction = (
    questionId: string,
    action: string,
    notes?: string,
  ) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId
        ? {
            ...q,
            status: action as Question["status"],
            reviewNotes: notes || q.reviewNotes,
          }
        : q,
    );
    setQuestions(updatedQuestions);
    localStorage.setItem(
      `exam-${id}-questions`,
      JSON.stringify(updatedQuestions),
    );
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedQuestions.length === 0) return;

    const updatedQuestions = questions.map((q) =>
      selectedQuestions.includes(q.id)
        ? {
            ...q,
            status: bulkAction as Question["status"],
            reviewNotes: reviewNotes || q.reviewNotes,
          }
        : q,
    );
    setQuestions(updatedQuestions);
    localStorage.setItem(
      `exam-${id}-questions`,
      JSON.stringify(updatedQuestions),
    );
    setSelectedQuestions([]);
    setBulkAction("");
    setReviewNotes("");
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setValue("questionText", question.text);
    setValue("option1", question.options[0]);
    setValue("option2", question.options[1]);
    setValue("option3", question.options[2]);
    setValue("option4", question.options[3]);
    setValue("correctOption", question.correctOption.toString());
    setValue("marks", question.marks);
    setIsEditDialogOpen(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    setQuestions(updatedQuestions);
    localStorage.setItem(
      `exam-${id}-questions`,
      JSON.stringify(updatedQuestions),
    );
  };

  const onSubmitQuestion = (data: QuestionFormData) => {
    const questionData = {
      id: editingQuestion?.id || Math.random().toString(36).substring(2, 9),
      text: data.questionText,
      options: [data.option1, data.option2, data.option3, data.option4],
      correctOption: parseInt(data.correctOption),
      marks: data.marks,
      status: "pending" as const,
      createdBy: "Admin",
      createdAt: new Date().toISOString(),
    };

    let updatedQuestions;
    if (editingQuestion) {
      updatedQuestions = questions.map((q) =>
        q.id === editingQuestion.id ? { ...questionData, status: q.status } : q,
      );
    } else {
      updatedQuestions = [...questions, questionData];
    }

    setQuestions(updatedQuestions);
    localStorage.setItem(
      `exam-${id}-questions`,
      JSON.stringify(updatedQuestions),
    );

    setIsEditDialogOpen(false);
    setIsAddDialogOpen(false);
    setEditingQuestion(null);
    reset();
  };

  const handleFinalizeExamination = () => {
    const allApproved = questions.every((q) => q.status === "approved");
    if (!allApproved) {
      alert(
        "All questions must be approved before finalizing the examination.",
      );
      return;
    }

    if (examination) {
      const updatedExam = { ...examination, status: "approved" as const };
      setExamination(updatedExam);
      localStorage.setItem(`exam-${id}-details`, JSON.stringify(updatedExam));
      alert("Examination has been approved and finalized!");
    }
  };

  const filteredQuestions = questions.filter(
    (q) => filterStatus === "all" || q.status === filterStatus,
  );

  const questionStats = {
    total: questions.length,
    pending: questions.filter((q) => q.status === "pending").length,
    approved: questions.filter((q) => q.status === "approved").length,
    rejected: questions.filter((q) => q.status === "rejected").length,
    needsRevision: questions.filter((q) => q.status === "needs_revision")
      .length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading examination for review...
          </p>
        </div>
      </div>
    );
  }

  if (!examination) {
    return (
      <div className="text-center py-12 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Examination Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The examination you're trying to review doesn't exist.
        </p>
        <Button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Review: {examination.subject} Examination
              </h1>
              <Badge
                className={`${examination.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
              >
                {examination.status.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {examination.class}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {examination.teacher}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(examination.date).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/examination/${examination.id}`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button
              onClick={handleFinalizeExamination}
              disabled={
                questionStats.pending > 0 || questionStats.needsRevision > 0
              }
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Finalize Examination
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">
            {questionStats.total}
          </div>
          <div className="text-sm text-gray-600">Total Questions</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-yellow-600">
            {questionStats.pending}
          </div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-green-600">
            {questionStats.approved}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-red-600">
            {questionStats.rejected}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-orange-600">
            {questionStats.needsRevision}
          </div>
          <div className="text-sm text-gray-600">Needs Revision</div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="review" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="review">Review Questions</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Filters and Actions */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Questions</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="needs_revision">
                      Needs Revision
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Question</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit(onSubmitQuestion)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="questionText">Question Text</Label>
                      <Textarea
                        id="questionText"
                        {...register("questionText", {
                          required: "Question text is required",
                        })}
                      />
                      {errors.questionText && (
                        <p className="text-sm text-red-500">
                          {errors.questionText.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="space-y-2">
                          <Label htmlFor={`option${num}`}>Option {num}</Label>
                          <Input
                            id={`option${num}`}
                            {...register(
                              `option${num}` as keyof QuestionFormData,
                              {
                                required: `Option ${num} is required`,
                              },
                            )}
                          />
                          {errors[`option${num}` as keyof QuestionFormData] && (
                            <p className="text-sm text-red-500">
                              {
                                errors[`option${num}` as keyof QuestionFormData]
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label>Correct Option</Label>
                      <RadioGroup defaultValue="0" className="flex gap-4">
                        {[0, 1, 2, 3].map((index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={index.toString()}
                              id={`option${index + 1}-radio`}
                              {...register("correctOption")}
                            />
                            <Label htmlFor={`option${index + 1}-radio`}>
                              Option {index + 1}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
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
                        <p className="text-sm text-red-500">
                          {errors.marks.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Question</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Questions List */}
            <div className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-medium text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div
                            className="text-gray-900 font-medium mb-2 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: question.text }}
                          />
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{question.marks} marks</span>
                            <span>By: {question.createdBy}</span>
                            <span>
                              {new Date(
                                question.createdAt || "",
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(question.status)}
                          <Badge className={getStatusColor(question.status)}>
                            {question.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 ml-11">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-md ${
                            optionIndex === question.correctOption
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                optionIndex === question.correctOption
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-700"
                              }`}
                            >
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span
                              className={`${
                                optionIndex === question.correctOption
                                  ? "font-medium text-green-800"
                                  : "text-gray-700"
                              }`}
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

                    {/* Review Notes */}
                    {question.reviewNotes && (
                      <div className="ml-11 mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-yellow-800">
                          <strong>Review Notes:</strong> {question.reviewNotes}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 ml-11">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleQuestionAction(question.id, "approved")
                        }
                        className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        disabled={question.status === "approved"}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const notes = prompt("Enter rejection reason:");
                          if (notes)
                            handleQuestionAction(
                              question.id,
                              "rejected",
                              notes,
                            );
                        }}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        disabled={question.status === "rejected"}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const notes = prompt("Enter revision notes:");
                          if (notes)
                            handleQuestionAction(
                              question.id,
                              "needs_revision",
                              notes,
                            );
                        }}
                        className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50"
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Request Revision
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditQuestion(question)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this question?",
                            )
                          ) {
                            handleDeleteQuestion(question.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredQuestions.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No questions found for the selected filter.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="mt-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Bulk Actions
            </h3>

            {/* Question Selection Table */}
            <div className="mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedQuestions(questions.map((q) => q.id));
                          } else {
                            setSelectedQuestions([]);
                          }
                        }}
                        checked={
                          selectedQuestions.length === questions.length &&
                          questions.length > 0
                        }
                      />
                    </TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Created By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((question, index) => (
                    <TableRow key={question.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedQuestions.includes(question.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedQuestions([
                                ...selectedQuestions,
                                question.id,
                              ]);
                            } else {
                              setSelectedQuestions(
                                selectedQuestions.filter(
                                  (id) => id !== question.id,
                                ),
                              );
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="font-medium text-gray-900 truncate">
                            {index + 1}. {question.text}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(question.status)}>
                          {question.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{question.marks}</TableCell>
                      <TableCell>{question.createdBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Bulk Action Controls */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approve Selected</SelectItem>
                    <SelectItem value="rejected">Reject Selected</SelectItem>
                    <SelectItem value="needs_revision">
                      Request Revision
                    </SelectItem>
                    <SelectItem value="pending">Mark as Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleBulkAction}
                  disabled={!bulkAction || selectedQuestions.length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Apply to {selectedQuestions.length} Questions
                </Button>
              </div>

              {(bulkAction === "rejected" ||
                bulkAction === "needs_revision") && (
                <div className="space-y-2">
                  <Label htmlFor="reviewNotes">Notes (Required)</Label>
                  <Textarea
                    id="reviewNotes"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Enter notes for the selected questions..."
                  />
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Question Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitQuestion)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="questionText">Question Text</Label>
              <Textarea
                id="questionText"
                {...register("questionText", {
                  required: "Question text is required",
                })}
              />
              {errors.questionText && (
                <p className="text-sm text-red-500">
                  {errors.questionText.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="space-y-2">
                  <Label htmlFor={`option${num}`}>Option {num}</Label>
                  <Input
                    id={`option${num}`}
                    {...register(`option${num}` as keyof QuestionFormData, {
                      required: `Option ${num} is required`,
                    })}
                  />
                  {errors[`option${num}` as keyof QuestionFormData] && (
                    <p className="text-sm text-red-500">
                      {
                        errors[`option${num}` as keyof QuestionFormData]
                          ?.message
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Correct Option</Label>
              <RadioGroup defaultValue="0" className="flex gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={index.toString()}
                      id={`edit-option${index + 1}-radio`}
                      {...register("correctOption")}
                    />
                    <Label htmlFor={`edit-option${index + 1}-radio`}>
                      Option {index + 1}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marks">Marks</Label>
              <Input
                type="number"
                id="marks"
                className="max-w-[100px]"
                {...register("marks", {
                  required: "Marks are required",
                  min: { value: 1, message: "Marks must be at least 1" },
                })}
              />
              {errors.marks && (
                <p className="text-sm text-red-500">{errors.marks.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingQuestion(null);
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Update Question</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExaminationReviewPage;
