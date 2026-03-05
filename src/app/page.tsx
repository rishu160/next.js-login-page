"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OTPInput from "@/components/OTPInput";
import CountdownTimer from "@/components/CountdownTimer";

export default function Home() {
  const router = useRouter();
  const [email] = useState("john.doe@company.com");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOTPComplete = (code: string) => {
    setOtp(code);
    setError("");
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate validation (replace with real API)
      if (otp === "123456") {
        setSuccess(true);
        setTimeout(() => {
          // Redirect to dashboard or home
          console.log("Verification successful!");
        }, 1000);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setOtp("");
    setError("");
    setSuccess(false);
    // Simulate resend API call
    console.log("OTP resent to", email);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0a14] via-[#1a0a2e] to-[#0a0a14]">
      {/* Logo */}
      <div className="absolute top-8 left-8 z-20 animate-fade-in">
        <Image src="/next.js-login-page/logo.png" alt="Crow Logo" width={50} height={50} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="glass-card rounded-3xl p-10 w-full max-w-md animate-fade-in-delay-1">
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          {/* Title */}
          <div className="mb-8 animate-fade-in-delay-2">
            <h1 className="text-3xl font-bold mb-2">Verify your email</h1>
            <p className="text-gray-400 text-sm">
              We&apos;ve sent a 6-digit code to{" "}
              <span className="text-white font-medium">{email}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-6 animate-fade-in-delay-3">
            <OTPInput length={6} onComplete={handleOTPComplete} />
            {error && (
              <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-400 text-sm mt-3 text-center">✓ Verification successful!</p>
            )}
          </div>

          {/* Timer */}
          <div className="mb-8 animate-fade-in-delay-3">
            <CountdownTimer
              initialSeconds={24}
              onResend={handleResend}
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleSubmit}
            disabled={otp.length !== 6 || loading || success}
            className="btn-next w-full py-4 rounded-xl text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 animate-fade-in-delay-4"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : success ? (
              "Verified ✓"
            ) : (
              <>
                Verify
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            )}
          </button>

          {/* Footer Links */}
          <div className="mt-8 text-center text-xs text-gray-500 animate-fade-in-delay-4">
            <a href="#" className="hover:text-purple-400 transition-colors">
              Terms
            </a>
            {" • "}
            <a href="#" className="hover:text-purple-400 transition-colors">
              Privacy
            </a>
            {" • "}
            <a href="#" className="hover:text-purple-400 transition-colors">
              Content Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
