import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Teacher = {
  id: string;
  name: string;
  email: string;
  class: string;
  subject: string;
  phone: string;
  joinDate: string;
  status: "active" | "inactive";
};

const TeachersPage = () => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isAccountSetupDialogOpen, setIsAccountSetupDialogOpen] =
    useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // Mock data for teachers
  const teachers: Teacher[] = [
    {
      id: "T001",
      name: "John Smith",
      email: "john.smith@perfectschool.edu",
      class: "Grade 10-A",
      subject: "Mathematics",
      phone: "(555) 123-4567",
      joinDate: "2022-08-15",
      status: "active",
    },
    {
      id: "T002",
      name: "Sarah Johnson",
      email: "sarah.johnson@perfectschool.edu",
      class: "Grade 9-B",
      subject: "English Literature",
      phone: "(555) 234-5678",
      joinDate: "2021-09-01",
      status: "active",
    },
    {
      id: "T003",
      name: "Michael Chen",
      email: "michael.chen@perfectschool.edu",
      class: "Grade 11-C",
      subject: "Physics",
      phone: "(555) 345-6789",
      joinDate: "2023-01-10",
      status: "active",
    },
    {
      id: "T004",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@perfectschool.edu",
      class: "Grade 8-A",
      subject: "History",
      phone: "(555) 456-7890",
      joinDate: "2022-03-22",
      status: "inactive",
    },
    {
      id: "T005",
      name: "David Wilson",
      email: "david.wilson@perfectschool.edu",
      class: "Grade 12-B",
      subject: "Chemistry",
      phone: "(555) 567-8901",
      joinDate: "2021-11-05",
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
        <Button
          onClick={() => setIsInviteDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Invite Teacher
        </Button>
      </div>

      {/* Teachers List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {teacher.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {teacher.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {teacher.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {teacher.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {teacher.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {teacher.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {teacher.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${teacher.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {teacher.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      Edit
                    </button>
                    {teacher.status === "active" ? (
                      <button
                        className="text-amber-600 hover:text-amber-800 mr-3"
                        onClick={() => {
                          // In a real app, this would call an API to deactivate the teacher
                          // For now, we'll just show how it would work in the UI
                          alert(`Teacher ${teacher.name} would be deactivated`);
                        }}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className="text-green-600 hover:text-green-800 mr-3"
                        onClick={() => {
                          // In a real app, this would call an API to activate the teacher
                          alert(`Teacher ${teacher.name} would be activated`);
                        }}
                      >
                        Activate
                      </button>
                    )}
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Teacher Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Teacher</DialogTitle>
            <DialogDescription>
              Send an invitation to a new teacher to join the school platform.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" placeholder="Full name" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3"
                placeholder="email@example.com"
                type="email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                className="col-span-3"
                placeholder="Subject to teach"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class" className="text-right">
                Class
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade-8a">Grade 8-A</SelectItem>
                  <SelectItem value="grade-8b">Grade 8-B</SelectItem>
                  <SelectItem value="grade-9a">Grade 9-A</SelectItem>
                  <SelectItem value="grade-9b">Grade 9-B</SelectItem>
                  <SelectItem value="grade-10a">Grade 10-A</SelectItem>
                  <SelectItem value="grade-10b">Grade 10-B</SelectItem>
                  <SelectItem value="grade-11a">Grade 11-A</SelectItem>
                  <SelectItem value="grade-11b">Grade 11-B</SelectItem>
                  <SelectItem value="grade-12a">Grade 12-A</SelectItem>
                  <SelectItem value="grade-12b">Grade 12-B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                className="col-span-3"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsInviteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                // Handle invite submission
                setIsInviteDialogOpen(false);
                // In a real app, this would send an email with a link to complete registration
                // For demo purposes, we'll just open the account setup dialog
                setIsAccountSetupDialogOpen(true);
              }}
            >
              Send Invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Account Setup Dialog - This would normally be a separate page that the teacher accesses via email link */}
      <Dialog
        open={isAccountSetupDialogOpen}
        onOpenChange={setIsAccountSetupDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Account Setup</DialogTitle>
            <DialogDescription>
              Welcome to Perfect School! Please complete your account setup to
              get started.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                className="col-span-3"
                type="password"
                placeholder="Create a secure password"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmPassword" className="text-right">
                Confirm
              </Label>
              <Input
                id="confirmPassword"
                className="col-span-3"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="qualification" className="text-right">
                Qualification
              </Label>
              <Input
                id="qualification"
                className="col-span-3"
                placeholder="e.g., M.Ed., Ph.D., B.Sc."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience
              </Label>
              <Input
                id="experience"
                className="col-span-3"
                placeholder="Years of teaching experience"
                type="number"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsAccountSetupDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                // Handle account setup submission
                setIsAccountSetupDialogOpen(false);
                alert("Account setup completed successfully!");
              }}
            >
              Complete Setup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeachersPage;
