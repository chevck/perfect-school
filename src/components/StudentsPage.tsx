import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "./ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Parent {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  occupation: string;
  isEmergencyContact: boolean;
}

interface Sibling {
  id: string;
  name: string;
  age: number;
  grade?: string;
  inSameSchool: boolean;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  class: string;
  section: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  joinDate: string;
  isActive: boolean;
  profileImage?: string;
  parents: Parent[];
  siblings: Sibling[];
  teacherId: string;
  teacherName: string;
  bloodGroup?: string;
  medicalConditions?: string;
  emergencyContact?: string;
  fees?: {
    status: "paid" | "pending" | "overdue";
    lastPaymentDate?: string;
    dueAmount?: number;
  };
}

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    firstName: "",
    lastName: "",
    admissionNumber: "",
    class: "",
    section: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    joinDate: new Date().toISOString().split("T")[0],
    isActive: true,
    parents: [],
    siblings: [],
  });

  // Load mock data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockStudents: Student[] = [
      {
        id: "1",
        firstName: "John",
        lastName: "Smith",
        admissionNumber: "STU2023001",
        class: "Grade 10",
        section: "A",
        gender: "Male",
        dateOfBirth: "2008-05-15",
        address: "123 School Lane, Springfield",
        joinDate: "2020-09-01",
        isActive: true,
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        parents: [
          {
            id: "p1",
            name: "Robert Smith",
            relationship: "Father",
            phone: "555-123-4567",
            email: "robert@example.com",
            occupation: "Engineer",
            isEmergencyContact: true,
          },
          {
            id: "p2",
            name: "Mary Smith",
            relationship: "Mother",
            phone: "555-123-4568",
            email: "mary@example.com",
            occupation: "Doctor",
            isEmergencyContact: false,
          },
        ],
        siblings: [
          {
            id: "s1",
            name: "Emma Smith",
            age: 14,
            grade: "Grade 8",
            inSameSchool: true,
          },
        ],
        teacherId: "t1",
        teacherName: "Ms. Johnson",
        bloodGroup: "O+",
        medicalConditions: "Asthma",
        emergencyContact: "555-123-4567",
        fees: {
          status: "paid",
          lastPaymentDate: "2023-04-15",
          dueAmount: 0,
        },
      },
      {
        id: "2",
        firstName: "Sarah",
        lastName: "Williams",
        admissionNumber: "STU2023002",
        class: "Grade 9",
        section: "B",
        gender: "Female",
        dateOfBirth: "2009-08-22",
        address: "456 Education Ave, Springfield",
        joinDate: "2021-09-01",
        isActive: true,
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        parents: [
          {
            id: "p3",
            name: "James Williams",
            relationship: "Father",
            phone: "555-234-5678",
            email: "james@example.com",
            occupation: "Accountant",
            isEmergencyContact: true,
          },
        ],
        siblings: [],
        teacherId: "t2",
        teacherName: "Mr. Brown",
        bloodGroup: "A+",
        fees: {
          status: "pending",
          dueAmount: 500,
        },
      },
      {
        id: "3",
        firstName: "Michael",
        lastName: "Johnson",
        admissionNumber: "STU2022015",
        class: "Grade 11",
        section: "A",
        gender: "Male",
        dateOfBirth: "2007-03-10",
        address: "789 Learning Blvd, Springfield",
        joinDate: "2019-09-01",
        isActive: false,
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        parents: [
          {
            id: "p4",
            name: "David Johnson",
            relationship: "Father",
            phone: "555-345-6789",
            email: "david@example.com",
            occupation: "Lawyer",
            isEmergencyContact: false,
          },
          {
            id: "p5",
            name: "Lisa Johnson",
            relationship: "Mother",
            phone: "555-345-6780",
            email: "lisa@example.com",
            occupation: "Teacher",
            isEmergencyContact: true,
          },
        ],
        siblings: [
          {
            id: "s2",
            name: "Daniel Johnson",
            age: 10,
            grade: "Grade 4",
            inSameSchool: true,
          },
          {
            id: "s3",
            name: "Emily Johnson",
            age: 16,
            grade: "Grade 12",
            inSameSchool: true,
          },
        ],
        teacherId: "t3",
        teacherName: "Mrs. Davis",
        bloodGroup: "B-",
        medicalConditions: "Allergies to nuts",
        emergencyContact: "555-345-6780",
        fees: {
          status: "overdue",
          lastPaymentDate: "2022-12-10",
          dueAmount: 1200,
        },
      },
    ];

    setStudents(mockStudents);
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateStudent = () => {
    // Validate required fields
    if (
      !newStudent.firstName ||
      !newStudent.lastName ||
      !newStudent.admissionNumber ||
      !newStudent.class ||
      !newStudent.gender ||
      !newStudent.dateOfBirth
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const student: Student = {
      id: `${Date.now()}`,
      firstName: newStudent.firstName || "",
      lastName: newStudent.lastName || "",
      admissionNumber: newStudent.admissionNumber || "",
      class: newStudent.class || "",
      section: newStudent.section || "A",
      gender: newStudent.gender || "",
      dateOfBirth: newStudent.dateOfBirth || "",
      address: newStudent.address || "",
      joinDate: newStudent.joinDate || new Date().toISOString().split("T")[0],
      isActive: true,
      parents: [],
      siblings: [],
      teacherId: "t1",
      teacherName: "Unassigned",
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newStudent.firstName}`,
    };

    setStudents([...students, student]);
    setNewStudent({
      firstName: "",
      lastName: "",
      admissionNumber: "",
      class: "",
      section: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      joinDate: new Date().toISOString().split("T")[0],
      isActive: true,
      parents: [],
      siblings: [],
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Student Created",
      description: `${student.firstName} ${student.lastName} has been added successfully.`,
      variant: "success",
    });
  };

  const handleUpdateStudent = () => {
    if (!selectedStudent) return;

    const updatedStudents = students.map((student) =>
      student.id === selectedStudent.id ? selectedStudent : student,
    );

    setStudents(updatedStudents);
    setIsEditDialogOpen(false);

    toast({
      title: "Student Updated",
      description: `${selectedStudent.firstName} ${selectedStudent.lastName}'s information has been updated.`,
      variant: "success",
    });
  };

  const handleDeleteStudent = () => {
    if (!selectedStudent) return;

    const updatedStudents = students.filter(
      (student) => student.id !== selectedStudent.id,
    );

    setStudents(updatedStudents);
    setIsDeleteDialogOpen(false);

    toast({
      title: "Student Removed",
      description: `${selectedStudent.firstName} ${selectedStudent.lastName} has been removed from the system.`,
      variant: "info",
    });
  };

  const toggleStudentStatus = (student: Student) => {
    const updatedStudents = students.map((s) =>
      s.id === student.id ? { ...s, isActive: !s.isActive } : s,
    );

    setStudents(updatedStudents);

    toast({
      title: student.isActive ? "Student Deactivated" : "Student Activated",
      description: `${student.firstName} ${student.lastName} has been ${student.isActive ? "deactivated" : "activated"}.`,
      variant: student.isActive ? "info" : "success",
    });
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
        Inactive
      </Badge>
    );
  };

  const getFeeStatusBadge = (status?: "paid" | "pending" | "overdue") => {
    if (!status) return null;

    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Overdue
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500">
            Manage student records and information
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Student
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="grade9">Grade 9</SelectItem>
                <SelectItem value="grade10">Grade 10</SelectItem>
                <SelectItem value="grade11">Grade 11</SelectItem>
                <SelectItem value="grade12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Admission #</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <svg
                        className="w-12 h-12 mb-2 text-gray-300"
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
                      <p className="text-lg font-medium">No students found</p>
                      <p className="text-sm">
                        {searchTerm
                          ? "Try adjusting your search criteria"
                          : "Add a student to get started"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                          {student.profileImage ? (
                            <img
                              src={student.profileImage}
                              alt={`${student.firstName} ${student.lastName}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 font-medium text-sm">
                              {student.firstName[0]}
                              {student.lastName[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {student.gender} •{" "}
                            {new Date(student.dateOfBirth).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.admissionNumber}</TableCell>
                    <TableCell>
                      {student.class} {student.section}
                    </TableCell>
                    <TableCell>{getStatusBadge(student.isActive)}</TableCell>
                    <TableCell>
                      {getFeeStatusBadge(student.fees?.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toggleStudentStatus(student)}
                          >
                            {student.isActive ? (
                              <>
                                <UserX className="h-4 w-4 mr-2" /> Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" /> Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Student Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the student's information below. Required fields are marked
              with an asterisk (*).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={newStudent.firstName}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, firstName: e.target.value })
                  }
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={newStudent.lastName}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, lastName: e.target.value })
                  }
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="admissionNumber">Admission Number *</Label>
                <Input
                  id="admissionNumber"
                  value={newStudent.admissionNumber}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      admissionNumber: e.target.value,
                    })
                  }
                  placeholder="STU20230001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={newStudent.dateOfBirth}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      dateOfBirth: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class">Class *</Label>
                <Select
                  value={newStudent.class}
                  onValueChange={(value) =>
                    setNewStudent({ ...newStudent, class: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade 9">Grade 9</SelectItem>
                    <SelectItem value="Grade 10">Grade 10</SelectItem>
                    <SelectItem value="Grade 11">Grade 11</SelectItem>
                    <SelectItem value="Grade 12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select
                  value={newStudent.section}
                  onValueChange={(value) =>
                    setNewStudent({ ...newStudent, section: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={newStudent.gender}
                  onValueChange={(value) =>
                    setNewStudent({ ...newStudent, gender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={newStudent.joinDate}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, joinDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newStudent.address}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, address: e.target.value })
                }
                placeholder="123 School Lane, Springfield"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateStudent}>Create Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Student Dialog */}
      {selectedStudent && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                  {selectedStudent.profileImage ? (
                    <img
                      src={selectedStudent.profileImage}
                      alt={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 font-medium text-sm">
                      {selectedStudent.firstName[0]}
                      {selectedStudent.lastName[0]}
                    </div>
                  )}
                </div>
                <span>
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </span>
                {getStatusBadge(selectedStudent.isActive)}
              </DialogTitle>
              <DialogDescription>
                Student ID: {selectedStudent.admissionNumber} • Joined:{" "}
                {new Date(selectedStudent.joinDate).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="parents">Parents</TabsTrigger>
                <TabsTrigger value="siblings">Siblings</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Full Name</div>
                        <div className="text-sm">
                          {selectedStudent.firstName} {selectedStudent.lastName}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Date of Birth</div>
                        <div className="text-sm">
                          {new Date(
                            selectedStudent.dateOfBirth,
                          ).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Gender</div>
                        <div className="text-sm">{selectedStudent.gender}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Blood Group</div>
                        <div className="text-sm">
                          {selectedStudent.bloodGroup || "Not specified"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">
                          Medical Conditions
                        </div>
                        <div className="text-sm">
                          {selectedStudent.medicalConditions || "None"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Address</div>
                        <div className="text-sm">{selectedStudent.address}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">
                          Emergency Contact
                        </div>
                        <div className="text-sm">
                          {selectedStudent.emergencyContact || "Not specified"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Academic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Class</div>
                        <div className="text-sm">
                          {selectedStudent.class} {selectedStudent.section}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Teacher</div>
                        <div className="text-sm">
                          {selectedStudent.teacherName}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Join Date</div>
                        <div className="text-sm">
                          {new Date(
                            selectedStudent.joinDate,
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Fee Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Status</div>
                        <div className="text-sm">
                          {getFeeStatusBadge(selectedStudent.fees?.status)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">Due Amount</div>
                        <div className="text-sm">
                          ${selectedStudent.fees?.dueAmount || 0}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm font-medium">
                          Last Payment Date
                        </div>
                        <div className="text-sm">
                          {selectedStudent.fees?.lastPaymentDate
                            ? new Date(
                                selectedStudent.fees.lastPaymentDate,
                              ).toLocaleDateString()
                            : "No payment recorded"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="parents" className="space-y-4 pt-4">
                {selectedStudent.parents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <p>No parent information available</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedStudent.parents.map((parent) => (
                      <Card key={parent.id}>
                        <CardHeader>
                          <CardTitle>{parent.name}</CardTitle>
                          <CardDescription>
                            {parent.relationship}
                            {parent.isEmergencyContact && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                Emergency Contact
                              </span>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Phone</div>
                            <div className="text-sm">{parent.phone}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">Email</div>
                            <div className="text-sm">{parent.email}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <div className="text-sm font-medium">
                              Occupation
                            </div>
                            <div className="text-sm">{parent.occupation}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="siblings" className="space-y-4 pt-4">
                {selectedStudent.siblings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <svg
                        className="w-6 h-6 text-gray-400"
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
                    <p>No siblings information available</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedStudent.siblings.map((sibling) => (
                      <Card key={sibling.id}>
                        <CardHeader>
                          <CardTitle>{sibling.name}</CardTitle>
                          <CardDescription>
                            {sibling.age} years old
                            {sibling.inSameSchool && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                Same School
                              </span>
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {sibling.grade && (
                            <div className="grid grid-cols-2 gap-1">
                              <div className="text-sm font-medium">Grade</div>
                              <div className="text-sm">{sibling.grade}</div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="academic" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Performance</CardTitle>
                    <CardDescription>
                      Current academic year performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          ></path>
                        </svg>
                      </div>
                      <p>Academic performance data not available</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false);
                  setIsEditDialogOpen(true);
                }}
              >
                Edit Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Student Dialog */}
      {selectedStudent && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update the student's information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editFirstName">First Name</Label>
                  <Input
                    id="editFirstName"
                    value={selectedStudent.firstName}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editLastName">Last Name</Label>
                  <Input
                    id="editLastName"
                    value={selectedStudent.lastName}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editAdmissionNumber">Admission Number</Label>
                  <Input
                    id="editAdmissionNumber"
                    value={selectedStudent.admissionNumber}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        admissionNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDateOfBirth">Date of Birth</Label>
                  <Input
                    id="editDateOfBirth"
                    type="date"
                    value={selectedStudent.dateOfBirth}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        dateOfBirth: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editClass">Class</Label>
                  <Select
                    value={selectedStudent.class}
                    onValueChange={(value) =>
                      setSelectedStudent({ ...selectedStudent, class: value })
                    }
                  >
                    <SelectTrigger id="editClass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 9">Grade 9</SelectItem>
                      <SelectItem value="Grade 10">Grade 10</SelectItem>
                      <SelectItem value="Grade 11">Grade 11</SelectItem>
                      <SelectItem value="Grade 12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editSection">Section</Label>
                  <Select
                    value={selectedStudent.section}
                    onValueChange={(value) =>
                      setSelectedStudent({ ...selectedStudent, section: value })
                    }
                  >
                    <SelectTrigger id="editSection">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editGender">Gender</Label>
                  <Select
                    value={selectedStudent.gender}
                    onValueChange={(value) =>
                      setSelectedStudent({ ...selectedStudent, gender: value })
                    }
                  >
                    <SelectTrigger id="editGender">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editBloodGroup">Blood Group</Label>
                  <Input
                    id="editBloodGroup"
                    value={selectedStudent.bloodGroup || ""}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        bloodGroup: e.target.value,
                      })
                    }
                    placeholder="A+, B-, O+, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editAddress">Address</Label>
                <Input
                  id="editAddress"
                  value={selectedStudent.address}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editMedicalConditions">
                  Medical Conditions
                </Label>
                <Input
                  id="editMedicalConditions"
                  value={selectedStudent.medicalConditions || ""}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      medicalConditions: e.target.value,
                    })
                  }
                  placeholder="Any medical conditions or allergies"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateStudent}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Student Dialog */}
      {selectedStudent && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove Student</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove {selectedStudent.firstName}{" "}
                {selectedStudent.lastName} from the system? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteStudent}>
                Remove Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StudentsPage;
