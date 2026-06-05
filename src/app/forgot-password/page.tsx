"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordRequestPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/users/forgotPasswordRequest", { email });

      toast.success(response.data.message || "Reset link sent to your email!");
      setEmail(""); 
      setLoading(false);
      
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 
        "Something went wrong. Please try again."
      );
      setLoading(false);
    } 
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-neutral-950 text-white selection:bg-amber-500 selection:text-black p-4">
      
      <div className="w-full max-w-md border border-neutral-900 rounded-2xl flex flex-col p-8 bg-neutral-900/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Ambient theme glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-6 justify-center relative z-10">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black text-sm">
            N
          </div>
          <span className="text-xl font-bold tracking-tight">nextAuth</span>
        </div>

        <div className="relative z-10 text-center mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Reset Password
          </h2>
          <p className="mt-1.5 text-sm text-neutral-400">
            Enter your email and we'll send you a temporary secure link to recover your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 relative z-10">
          {/* Email Address Input */}
          <div className="w-full flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wider text-neutral-400"
            >
              Email Address
            </label>
            <input
              className="w-full border border-neutral-800 bg-neutral-950/60 p-3 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
              type="email"
              id="email"
              placeholder="john_doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-black font-bold p-3 rounded-xl mt-4 shadow-lg shadow-amber-500/10 hover:bg-amber-400 hover:shadow-amber-500/20 transition-all disabled:bg-neutral-800 disabled:text-neutral-500 cursor-pointer disabled:cursor-not-allowed text-sm flex justify-center items-center"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="mt-6 text-xs text-neutral-500 text-center relative z-10">
          Remembered your details?{" "}
          <Link href="/login" className="text-amber-500 hover:text-amber-400 font-medium transition-colors ml-1">
            Back to Sign In
          </Link>
        </p>
      </div>

    </div>
  );
}