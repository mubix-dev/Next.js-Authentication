"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const forgotPasswordToken = params.forgotPasswordToken;

    if (!forgotPasswordToken) {
      toast.error("Reset token is missing or invalid.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `/api/users/forgot-password/${forgotPasswordToken}`,
        { newPassword }
      );

      toast.success(response.data.message || "Password reset successful!");
      
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
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
            Create New Password
          </h2>
          <p className="mt-1.5 text-sm text-neutral-400">
            Please enter your new security credentials below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 relative z-10">
          {/* New Password Input */}
          <div className="w-full flex flex-col gap-1.5">
            <label
              htmlFor="newPassword"
              className="text-xs font-semibold uppercase tracking-wider text-neutral-400"
            >
              New Password
            </label>
            <input
              className="w-full border border-neutral-800 bg-neutral-950/60 p-3 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
              type="password"
              id="newPassword"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="w-full flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-semibold uppercase tracking-wider text-neutral-400"
            >
              Confirm New Password
            </label>
            <input
              className="w-full border border-neutral-800 bg-neutral-950/60 p-3 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Action CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-black font-bold p-3 rounded-xl mt-4 shadow-lg shadow-amber-500/10 hover:bg-amber-400 hover:shadow-amber-500/20 transition-all disabled:bg-neutral-800 disabled:text-neutral-500 cursor-pointer disabled:cursor-not-allowed text-sm flex justify-center items-center"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <p className="mt-6 text-xs text-neutral-500 text-center relative z-10">
          Remember your details?{" "}
          <Link href="/login" className="text-amber-500 hover:text-amber-400 font-medium transition-colors ml-1">
            Back to Sign In
          </Link>
        </p>
      </div>

    </div>
  );
}