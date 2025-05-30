import React from "react";

interface LoginOTPEmailProps {
  schoolName?: string;
  name?: string;
  email?: string;
  otp?: string;
  expiryMinutes?: number;
}

const LoginOTPEmail: React.FC<LoginOTPEmailProps> = ({
  schoolName = "Westside High School",
  name = "John Doe",
  email = "john.doe@example.com",
  otp = "123456",
  expiryMinutes = 10,
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
          Your Login Verification Code
        </h1>

        <div className="space-y-4 text-gray-700">
          <p>Dear {name},</p>

          <p>
            You recently requested to log in to your Perfect School App account
            for {schoolName}. Please use the verification code below to complete
            your login:
          </p>

          <div className="py-6 flex justify-center">
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-8 py-6">
              <div className="text-3xl font-mono font-bold tracking-widest text-center">
                {otp.split("").map((digit, index) => (
                  <span key={index} className="inline-block mx-1">
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            This code will expire in {expiryMinutes} minutes.
          </p>

          <p className="mt-4">
            If you did not request this code, please ignore this email or
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

export default LoginOTPEmail;
