import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CreateExaminationFormProps {
  onSubmit: (data: ExaminationFormData) => void;
}

interface ExaminationFormData {
  subject: string;
  class: string;
  teacher: string;
  date: string;
  term: string;
  totalMarks: number;
  session: string;
  duration: number;
  instructions: string;
}

const CreateExaminationForm: React.FC<CreateExaminationFormProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExaminationFormData>({
    defaultValues: {
      subject: "",
      class: "",
      teacher: "",
      date: new Date().toISOString().split("T")[0],
      term: "First Term",
      totalMarks: 100,
      session: "2023/2024",
      duration: 120,
      instructions:
        "Answer all questions. Each question carries the marks indicated.",
    },
  });

  const onFormSubmit = (data: ExaminationFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select>
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="geography">Geography</SelectItem>
              <SelectItem value="computer_science">Computer Science</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="hidden"
            id="subject"
            {...register("subject", { required: "Subject is required" })}
          />
          {errors.subject && (
            <p className="text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="class">Class</Label>
          <Select>
            <SelectTrigger id="class">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grade9">Grade 9</SelectItem>
              <SelectItem value="grade10">Grade 10</SelectItem>
              <SelectItem value="grade11">Grade 11</SelectItem>
              <SelectItem value="grade12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="hidden"
            id="class"
            {...register("class", { required: "Class is required" })}
          />
          {errors.class && (
            <p className="text-sm text-red-500">{errors.class.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="teacher">Teacher</Label>
          <Select>
            <SelectTrigger id="teacher">
              <SelectValue placeholder="Select teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john_smith">John Smith</SelectItem>
              <SelectItem value="sarah_johnson">Sarah Johnson</SelectItem>
              <SelectItem value="michael_brown">Michael Brown</SelectItem>
              <SelectItem value="emily_davis">Emily Davis</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="hidden"
            id="teacher"
            {...register("teacher", { required: "Teacher is required" })}
          />
          {errors.teacher && (
            <p className="text-sm text-red-500">{errors.teacher.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Examination Date</Label>
          <Input
            type="date"
            id="date"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="term">Term</Label>
          <Select>
            <SelectTrigger id="term">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="First Term">First Term</SelectItem>
              <SelectItem value="Second Term">Second Term</SelectItem>
              <SelectItem value="Third Term">Third Term</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="hidden"
            id="term"
            {...register("term", { required: "Term is required" })}
          />
          {errors.term && (
            <p className="text-sm text-red-500">{errors.term.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="session">Academic Session</Label>
          <Select>
            <SelectTrigger id="session">
              <SelectValue placeholder="Select session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2022/2023">2022/2023</SelectItem>
              <SelectItem value="2023/2024">2023/2024</SelectItem>
              <SelectItem value="2024/2025">2024/2025</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="hidden"
            id="session"
            {...register("session", { required: "Session is required" })}
          />
          {errors.session && (
            <p className="text-sm text-red-500">{errors.session.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalMarks">Total Marks</Label>
          <Input
            type="number"
            id="totalMarks"
            {...register("totalMarks", {
              required: "Total marks is required",
              min: {
                value: 1,
                message: "Total marks must be at least 1",
              },
            })}
          />
          {errors.totalMarks && (
            <p className="text-sm text-red-500">{errors.totalMarks.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            type="number"
            id="duration"
            {...register("duration", {
              required: "Duration is required",
              min: {
                value: 1,
                message: "Duration must be at least 1 minute",
              },
            })}
          />
          {errors.duration && (
            <p className="text-sm text-red-500">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <textarea
          id="instructions"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[100px]"
          {...register("instructions")}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Create Examination
        </Button>
      </div>
    </form>
  );
};

export default CreateExaminationForm;
