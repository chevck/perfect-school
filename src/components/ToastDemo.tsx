import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4">Toast Notifications Demo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={() =>
            toast.success("Success!", "Operation completed successfully.")
          }
          className="bg-green-500 hover:bg-green-600"
        >
          Show Success Toast
        </Button>

        <Button
          onClick={() => toast.error("Error!", "Something went wrong.")}
          className="bg-red-500 hover:bg-red-600"
        >
          Show Error Toast
        </Button>

        <Button
          onClick={() =>
            toast.info("Information", "This is an informational message.")
          }
          className="bg-blue-500 hover:bg-blue-600"
        >
          Show Info Toast
        </Button>

        <Button
          onClick={() =>
            toast.warning("Warning", "This action might cause issues.")
          }
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Show Warning Toast
        </Button>

        <Button
          onClick={() =>
            toast({
              title: "Custom Toast",
              description: "This is a custom toast with default styling.",
            })
          }
          variant="outline"
        >
          Show Default Toast
        </Button>
      </div>
    </div>
  );
}
