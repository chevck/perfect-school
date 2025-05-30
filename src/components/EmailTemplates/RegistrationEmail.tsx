import React from "react";

interface RegistrationEmailProps {
  schoolName?: string;
  name?: string;
  email?: string;
  verificationLink?: string;
}

const RegistrationEmail: React.FC<RegistrationEmailProps> = ({
  schoolName = "Westside High School",
  name = "John Doe",
  email = "john.doe@example.com",
  verificationLink = "https://perfectschool.app/verify?token=abc123",
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
          Welcome to The Perfect School App!
        </h1>

        <div className="space-y-4 text-gray-700">
          <p>Dear {name},</p>

          <p>
            Thank you for registering {schoolName} with The Perfect School App.
            We're excited to have you on board!
          </p>

          <p>
            To complete your registration and verify your email address, please
            click the button below:
          </p>

          <div className="py-4 flex justify-center">
            <a
              href={verificationLink}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Verify Email Address
            </a>
          </div>

          <p>
            If the button above doesn't work, you can also copy and paste the
            following link into your browser:
          </p>

          <p className="bg-gray-50 p-3 rounded-md break-all text-blue-600">
            {verificationLink}
          </p>

          <p>
            This verification link will expire in 24 hours. If you did not
            create an account, please disregard this email.
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

export default RegistrationEmail;
