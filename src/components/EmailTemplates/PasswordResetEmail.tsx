import React from "react";

interface PasswordResetEmailProps {
  schoolName?: string;
  name?: string;
  email?: string;
  resetLink?: string;
  expiryMinutes?: number;
}

const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  schoolName = "Westside High School",
  name = "John Doe",
  email = "john.doe@example.com",
  resetLink = "https://perfectschool.app/reset-password?token=abc123",
  expiryMinutes = 30,
}) => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Password Reset Request
        </h1>

        <div className="space-y-4 text-gray-700">
          <p>Dear {name},</p>

          <p>
            We received a request to reset your password for your Perfect School
            App account at {schoolName}. To reset your password, please click
            the button below:
          </p>

          <div className="py-4 flex justify-center">
            <a
              href={resetLink}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset Your Password
            </a>
          </div>

          <p>
            If the button above doesn't work, you can also copy and paste the
            following link into your browser:
          </p>

          <p className="bg-gray-50 p-3 rounded-md break-all text-blue-600">
            {resetLink}
          </p>

          <p>
            This password reset link will expire in {expiryMinutes} minutes. If
            you did not request a password reset, please ignore this email or
            contact support if you believe your account may have been
            compromised.
          </p>

          <div className="pt-6 border-t border-gray-200 mt-6">
            <p>
              If you have any questions, please contact our support team at
              support@perfectschool.app
            </p>

            <p className="mt-4">
              Best regards,
              <br />
              The Perfect School App Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetEmail;
