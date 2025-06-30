import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Copy, Mail, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "./ui/use-toast";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  marks: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  status: "pending" | "completed";
  score?: number;
}

interface Examination {
  id: string;
  subject: string;
  class: string;
  teacher: string;
  date: string;
  term: string;
  totalMarks: number;
  session: string;
  status: "upcoming" | "ongoing" | "completed";
  students?: Student[];
}

const ExaminationViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [examination, setExamination] = useState<Examination | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    // In a real app, fetch from API
    // For now, use localStorage
    const fetchExamination = () => {
      setLoading(true);
      try {
        // Try to load examination details
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
              status: "upcoming",
              students: [
                {
                  id: "s1",
                  name: "Alice Johnson",
                  email: "alice@example.com",
                  status: "pending",
                },
                {
                  id: "s2",
                  name: "Bob Smith",
                  email: "bob@example.com",
                  status: "pending",
                },
                {
                  id: "s3",
                  name: "Charlie Brown",
                  email: "charlie@example.com",
                  status: "completed",
                  score: 85,
                },
                {
                  id: "s4",
                  name: "Diana Prince",
                  email: "diana@example.com",
                  status: "pending",
                },
              ],
            };

        setExamination(examData);

        // Generate share link
        const baseUrl = window.location.origin;
        setShareLink(`${baseUrl}/take-exam/${id}`);

        // Try to load questions
        const savedQuestions = localStorage.getItem(`exam-${id}-questions`);
        setQuestions(savedQuestions ? JSON.parse(savedQuestions) : []);
      } catch (error) {
        console.error("Error loading examination data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamination();
  }, [id]);

  const getStatusColor = (status: Examination["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateTotalMarks = () => {
    return questions.reduce((total, question) => total + question.marks, 0);
  };

  const handleShareExam = () => {
    if (!studentEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter a student email address",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send an email to the student
    // For now, we'll just add them to the students list if they're not already there
    if (examination) {
      const students = examination.students || [];
      const studentExists = students.some((s) => s.email === studentEmail);

      if (!studentExists) {
        const newStudent = {
          id: `s${Date.now()}`,
          name: studentEmail.split("@")[0], // Simple name extraction from email
          email: studentEmail,
          status: "pending" as const,
        };

        const updatedExam = {
          ...examination,
          students: [...students, newStudent],
        };

        setExamination(updatedExam);
        localStorage.setItem(`exam-${id}-details`, JSON.stringify(updatedExam));

        toast({
          title: "Invitation Sent",
          description: `Exam shared with ${studentEmail}`,
        });

        setStudentEmail("");
      } else {
        toast({
          title: "Already Shared",
          description: `This exam has already been shared with ${studentEmail}`,
          variant: "destructive",
        });
      }
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link Copied",
      description: "Exam link copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading examination details...</p>
        </div>
      </div>
    );
  }

  if (!examination) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Examination Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The examination you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          Back to Examinations
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {examination.subject} Examination
          </h1>
          <p className="text-gray-500">
            {examination.class} • {examination.term} • {examination.session}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            className={`${getStatusColor(examination.status)} px-3 py-1 text-sm`}
          >
            {examination.status.charAt(0).toUpperCase() +
              examination.status.slice(1)}
          </Badge>
          <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Examination</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Share Link</p>
                  <div className="flex items-center gap-2">
                    <Input value={shareLink} readOnly className="flex-1" />
                    <Button size="sm" variant="outline" onClick={copyShareLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Share via Email</p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="email"
                      placeholder="student@example.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleShareExam}>
                      <Mail className="h-4 w-4 mr-2" /> Send
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              window.location.href = `/set-questions/${examination.id}`;
            }}
          >
            Edit Questions
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Back to List
          </Button>
        </div>
      </div>

      {/* Examination Details Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Teacher</p>
            <p className="text-lg font-semibold text-gray-900">
              {examination.teacher}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Date</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date(examination.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Questions</p>
            <p className="text-lg font-semibold text-gray-900">
              {questions.length}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Marks</p>
            <p className="text-lg font-semibold text-gray-900">
              {calculateTotalMarks()} / {examination.totalMarks}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-2">
            Completion Status
          </p>
          <div className="space-y-2">
            <Progress
              value={(calculateTotalMarks() / examination.totalMarks) * 100}
              className="h-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>
                {Math.round(
                  (calculateTotalMarks() / examination.totalMarks) * 100,
                )}
                % Complete
              </span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {questions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Questions Added
                </h3>
                <p className="text-gray-500 mb-6">
                  This examination doesn't have any questions yet.
                </p>
                <Button
                  onClick={() => {
                    window.location.href = `/set-questions/${examination.id}`;
                  }}
                >
                  Add Questions
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {questions.map((question, index) => (
                  <div key={question.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-medium text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div
                            className="text-gray-900 font-medium prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: question.text }}
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {question.marks} marks
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pl-11">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-md ${optionIndex === question.correctOption ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"}`}
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {!examination.students || examination.students.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Students Assigned
                </h3>
                <p className="text-gray-500 mb-6">
                  Share this examination with students to get started.
                </p>
                <Button onClick={() => setShareDialogOpen(true)}>
                  Share Examination
                </Button>
              </div>
            ) : (
              <div>
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">Students</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                    className="flex items-center gap-1"
                  >
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Score</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {examination.students
                        .filter((student) => student.status === "pending")
                        .map((student) => (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {student.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              -
                            </td>
                          </tr>
                        ))}
                      {examination.students
                        .filter((student) => student.status === "completed")
                        .map((student) => (
                          <tr
                            key={student.id}
                            className="hover:bg-gray-50 bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {student.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Completed
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.score || "-"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {!examination.students ||
            examination.students.filter((s) => s.status === "completed")
              .length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Results Not Available
                </h3>
                <p className="text-gray-500 mb-6">
                  Results will be available after students complete the
                  examination.
                </p>
              </div>
            ) : (
              <div>
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">
                      Examination Results
                    </h3>
                    <div className="text-sm text-gray-500">
                      {
                        examination.students.filter(
                          (s) => s.status === "completed",
                        ).length
                      }{" "}
                      of {examination.students.length} completed
                    </div>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="p-6 border-b border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {
                          examination.students.filter(
                            (s) => s.status === "completed",
                          ).length
                        }
                      </div>
                      <div className="text-sm text-gray-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {
                          examination.students.filter(
                            (s) =>
                              s.status === "completed" &&
                              s.score &&
                              s.score >= calculateTotalMarks() * 0.6,
                          ).length
                        }
                      </div>
                      <div className="text-sm text-gray-500">Passed (≥60%)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {
                          examination.students.filter(
                            (s) =>
                              s.status === "completed" &&
                              s.score &&
                              s.score < calculateTotalMarks() * 0.6,
                          ).length
                        }
                      </div>
                      <div className="text-sm text-gray-500">
                        Failed (less than 60%)
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {examination.students.filter(
                          (s) => s.status === "completed" && s.score,
                        ).length > 0
                          ? Math.round(
                              examination.students
                                .filter(
                                  (s) => s.status === "completed" && s.score,
                                )
                                .reduce((sum, s) => sum + (s.score || 0), 0) /
                                examination.students.filter(
                                  (s) => s.status === "completed" && s.score,
                                ).length,
                            )
                          : 0}
                        %
                      </div>
                      <div className="text-sm text-gray-500">Average Score</div>
                    </div>
                  </div>
                </div>

                {/* Individual Results */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3 text-left">Student</th>
                        <th className="px-6 py-3 text-left">Score</th>
                        <th className="px-6 py-3 text-left">Percentage</th>
                        <th className="px-6 py-3 text-left">Grade</th>
                        <th className="px-6 py-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {examination.students
                        .filter((student) => student.status === "completed")
                        .sort((a, b) => (b.score || 0) - (a.score || 0))
                        .map((student, index) => {
                          const percentage = student.score
                            ? Math.round(
                                (student.score / calculateTotalMarks()) * 100,
                              )
                            : 0;
                          const getGrade = (percent: number) => {
                            if (percent >= 90)
                              return {
                                grade: "A+",
                                color: "text-green-700 bg-green-100",
                              };
                            if (percent >= 80)
                              return {
                                grade: "A",
                                color: "text-green-600 bg-green-50",
                              };
                            if (percent >= 70)
                              return {
                                grade: "B",
                                color: "text-blue-600 bg-blue-50",
                              };
                            if (percent >= 60)
                              return {
                                grade: "C",
                                color: "text-yellow-600 bg-yellow-50",
                              };
                            if (percent >= 50)
                              return {
                                grade: "D",
                                color: "text-orange-600 bg-orange-50",
                              };
                            return {
                              grade: "F",
                              color: "text-red-600 bg-red-50",
                            };
                          };
                          const gradeInfo = getGrade(percentage);

                          return (
                            <tr
                              key={student.id}
                              className={`hover:bg-gray-50 ${index === 0 ? "bg-yellow-50" : ""}`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {index === 0 && (
                                    <div className="mr-2 text-yellow-500">
                                      <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {student.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {student.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {student.score || 0} / {calculateTotalMarks()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {percentage}%
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${gradeInfo.color}`}
                                >
                                  {gradeInfo.grade}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    percentage >= 60
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {percentage >= 60 ? "Passed" : "Failed"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExaminationViewPage;
