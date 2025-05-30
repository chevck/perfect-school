import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      // This is where you would integrate with your authentication service
      console.log("Login attempt with:", data);

      // Simulate sending OTP
      setTimeout(() => {
        setIsLoading(false);
        setOtpSent(true);
        // Generate a random 6-digit OTP
        const generatedOtp = Math.floor(
          100000 + Math.random() * 900000,
        ).toString();
        setOtp(generatedOtp);
        console.log("OTP sent:", generatedOtp);
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      setError(
        "Failed to log in. Please check your credentials and try again.",
      );
      console.error("Login error:", err);
    }
  };

  const verifyOtp = () => {
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard"); // Redirect to dashboard page after successful verification
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Welcome back
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign in to access your Perfect School App account
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {otpSent ? (
          <div>
            <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">
              <p className="font-medium">Verification code sent!</p>
              <p className="text-sm mt-1">
                We've sent a 6-digit code to your email address. Please enter it
                below to continue.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center tracking-widest font-mono text-lg"
                  placeholder="123456"
                  maxLength={6}
                  disabled={isLoading}
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={verifyOtp}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Verifying..." : "Verify & Sign in"}
                </button>
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => setOtpSent(false)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Back to login
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? "Sending verification code..."
                  : "Continue with email verification"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
