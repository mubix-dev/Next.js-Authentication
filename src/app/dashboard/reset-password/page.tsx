"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Page() {
  const router = useRouter();

  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!currPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post("/api/users/reset-password", {
        currPassword,
        newPassword,
      });

      setSuccessMessage(
        result.data.message || "Password updated successfully!",
      );

      setCurrPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);
      setTimeout(() => {
        router.push("/dashboard/profile");
      }, 2500);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to change password. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-12 sm:px-6 lg:px-8 text-white selection:bg-amber-500 selection:text-black">
      <div className="w-full max-w-md border border-neutral-900 rounded-2xl flex flex-col p-8 bg-neutral-900/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        {/* Ambient theme glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Change Password
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-400">
            Secure your account by updating your credentials
          </p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
          {/* Status Message Containers */}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400 font-medium">
              ✕ {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-sm text-emerald-400 font-medium">
              ✓ {successMessage}
              <p className="text-xs text-emerald-500 mt-1">
                Redirecting you to your dashboard...
              </p>
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currPassword}
                onChange={(e) => setCurrPassword(e.target.value)}
                className="w-full rounded-xl bg-neutral-950/60 border border-neutral-900 px-3 py-2 text-sm text-neutral-300 placeholder-neutral-600 focus:border-amber-500 focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1.5">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl bg-neutral-950/60 border border-neutral-900 px-3 py-2 text-sm text-neutral-300 placeholder-neutral-600 focus:border-amber-500 focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl bg-neutral-950/60 border border-neutral-900 px-3 py-2 text-sm text-neutral-300 placeholder-neutral-600 focus:border-amber-500 focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <Link
              href="/dashboard/profile"
              className="font-medium text-neutral-500 hover:text-white transition-colors"
            >
              ← Back to Profile
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-black transition-all hover:bg-amber-600 disabled:bg-neutral-800 disabled:text-neutral-600 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}