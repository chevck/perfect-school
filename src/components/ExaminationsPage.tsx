import React, { useState } from "react";
import { motion } from "framer-motion";
import CreateExaminationForm from "./CreateExaminationForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

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
}

const ExaminationsPage = () => {
  const [examinations, setExaminations] = useState<Examination[]>([
    {
      id: "1",
      subject: "Mathematics",
      class: "Grade 10",
      teacher: "John Smith",
      date: "2023-06-15",
      term: "First Term",
      totalMarks: 100,
      session: "2023/2024",
      status: "upcoming",
    },
    {
      id: "2",
      subject: "Physics",
      class: "Grade 11",
      teacher: "Sarah Johnson",
      date: "2023-06-18",
      term: "First Term",
      totalMarks: 100,
      session: "2023/2024",
      status: "upcoming",
    },
    {
      id: "3",
      subject: "English Literature",
      class: "Grade 9",
      teacher: "Michael Brown",
      date: "2023-06-10",
      term: "First Term",
      totalMarks: 100,
      session: "2023/2024",
      status: "completed",
    },
    {
      id: "4",
      subject: "Chemistry",
      class: "Grade 12",
      teacher: "Emily Davis",
      date: "2023-06-12",
      term: "First Term",
      totalMarks: 100,
      session: "2023/2024",
      status: "ongoing",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddExamination = (
    newExamination: Omit<Examination, "id" | "status">,
  ) => {
    const examination: Examination = {
      ...newExamination,
      id: Math.random().toString(36).substring(2, 9),
      status: "upcoming",
    };
    setExaminations([...examinations, examination]);
    setIsDialogOpen(false);
  };

  const getStatusBadgeClass = (status: Examination["status"]) => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Examinations</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              New Examination
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Examination</DialogTitle>
            </DialogHeader>
            <CreateExaminationForm onSubmit={handleAddExamination} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="english">English</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="">All Classes</option>
            <option value="grade9">Grade 9</option>
            <option value="grade10">Grade 10</option>
            <option value="grade11">Grade 11</option>
            <option value="grade12">Grade 12</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Term
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="">All Terms</option>
            <option value="first">First Term</option>
            <option value="second">Second Term</option>
            <option value="third">Third Term</option>
          </select>
        </div>
      </div>

      {/* Examinations Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subject
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Class
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Teacher
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examinations.map((exam) => (
                <motion.tr
                  key={exam.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {exam.subject}
                    </div>
                    <div className="text-sm text-gray-500">
                      {exam.term} - {exam.session}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exam.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exam.teacher}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(exam.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        exam.status,
                      )}`}
                    >
                      {exam.status.charAt(0).toUpperCase() +
                        exam.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          window.location.href = `/set-questions/${exam.id}`;
                        }}
                      >
                        Set Questions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 hover:text-gray-800"
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExaminationsPage;
