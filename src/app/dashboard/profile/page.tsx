"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { dataContext } from "@/app/context/UserContextProvider";
import { useRouter } from "next/navigation";

function UserProfilePage() {
  const { userData } = useContext(dataContext);
  const [checkingSession, setCheckingSession] = useState(true);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingSession(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [userData]);

  const handleVerifyEmail = async () => {
    try {
      setVerifyingEmail(true);
      await axios.post("/api/users/verify-email-request");
      toast.success("Verification link sent to your email!");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to send verification link.",
      );
    } finally {
      setVerifyingEmail(false);
    }
  };

  if (!userData && checkingSession) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-neutral-950 text-neutral-400">
        <div className="animate-pulse">Verifying user session...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-neutral-950 text-neutral-400 p-4">
        <div className="text-red-400 mb-4">
          No active session found. Please log in again.
        </div>
        <Link
          href="/login"
          className="bg-amber-500 text-black px-4 py-2 rounded-xl text-sm font-bold"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 bg-neutral-950 text-white selection:bg-amber-500 selection:text-black">
      <div className="w-full max-w-md border border-neutral-900 rounded-2xl flex flex-col p-8 bg-neutral-900/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Ambient theme glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <h1 className="text-2xl font-bold border-b border-neutral-900 pb-3 mb-6 relative z-10">
          Context-Fed Profile
        </h1>

        {/* User Metadata Fields */}
        <div className="flex flex-col gap-4 relative z-10 mb-8">
          <div>
            <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-1.5 font-semibold">
              User ID
            </label>
            <div className="bg-neutral-950/60 border border-neutral-900 p-3 rounded-xl text-amber-500 font-mono text-xs break-all">
              {userData._id}
            </div>
          </div>

          <div>
            <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-1.5 font-semibold">
              Username
            </label>
            <div className="bg-neutral-950/60 border border-neutral-900 p-3 rounded-xl text-sm font-medium">
              {userData.username || "Not Set"}
            </div>
          </div>

          <div>
            <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-1.5 font-semibold">
              Email Address
            </label>
            <div className="bg-neutral-950/60 border border-neutral-900 p-3 rounded-xl text-sm text-neutral-300 flex justify-between items-center">
              <span>{userData.email}</span>
              {/* Optional: Add a verification badge icon if your data supports it */}
              {userData.isVerified ? (
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md font-medium uppercase tracking-wider">
                  Verified
                </span>
              ) : (
                <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md font-medium uppercase tracking-wider">
                  Pending
                </span>
              )}
            </div>
          </div>
        </div>

        {/* User Account Actions Block */}
        <div className="w-full flex flex-col gap-3 relative z-10 border-t border-neutral-900 pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
            Account Security
          </h2>

          {/* Conditional Email Verification Request Trigger */}
          {!userData.isVerified && (
            <button
              onClick={handleVerifyEmail}
              disabled={verifyingEmail}
              className="w-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:bg-neutral-900 text-amber-500 disabled:text-neutral-600 font-semibold p-3 rounded-xl transition-all text-sm cursor-pointer disabled:cursor-not-allowed text-left flex justify-between items-center"
            >
              <span>
                {verifyingEmail ? "Sending Link..." : "Verify Email Address"}
              </span>
              <span className="text-xs opacity-60">→</span>
            </button>
          )}

          {/* Password Reset Request Trigger */}
          <button
            onClick={() => router.push("/dashboard/reset-password")}
            className="w-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:bg-neutral-900 text-neutral-300 disabled:text-neutral-600 font-semibold p-3 rounded-xl transition-all text-sm cursor-pointer disabled:cursor-not-allowed text-left flex justify-between items-center"
          >
            <span>Change Password</span>
            <span className="text-xs opacity-60">→</span>
          </button>
        </div>

        {/* Quick Navigation Back Anchor */}
        <p className="mt-8 text-xs text-neutral-600 text-center relative z-10">
          Finished viewing?{" "}
          <Link
            href="/dashboard"
            className="text-neutral-400 hover:text-white transition-colors ml-1"
          >
            Return to Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserProfilePage;
