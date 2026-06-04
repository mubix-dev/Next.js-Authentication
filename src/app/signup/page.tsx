"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e:any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await axios.post("/api/users/signup",user)
      console.log(result.data);
      setLoading(false);
      toast.success(result.data.message);
      router.push("/login")
    } catch (error:any) {
      console.log(error)
        setLoading(false);
        toast.error(error.response?.data?.message || "Something went wrong")
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-neutral-950 text-white selection:bg-amber-500 selection:text-black p-4">
      
      <div className="w-full max-w-md  border border-neutral-900 rounded-2xl flex flex-col items-center p-5 bg-neutral-900/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Subtle background glow to match the home page theme style */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Logo Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black text-sm">
            N
          </div>
          <span className="text-xl font-bold tracking-tight">nextAuth</span>
        </div>

        <h2 className="text-lg font-medium text-neutral-400 mb-6 text-center">Create your account</h2>

        <form onSubmit={handleSignup} className="w-full flex flex-col gap-4 relative z-10">
          {/* Username Input */}
          <div className="w-full flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-xs font-semibold uppercase tracking-wider text-neutral-400"
            >
              Username
            </label>
            <input
              className="w-full border border-neutral-800 bg-neutral-950/60 p-3 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
              type="text"
              id="username"
              name="username"
              placeholder="@john_doe"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>

          {/* Email Input */}
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
              name="email"
              placeholder="john_doe@example.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>

          {/* Password Input */}
          <div className="w-full flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-neutral-400"
            >
              Password
            </label>
            <input
              className="w-full border border-neutral-800 bg-neutral-950/60 p-3 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all text-sm"
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-black font-bold p-3 rounded-xl mt-4 shadow-lg shadow-amber-500/10 hover:bg-amber-400 hover:shadow-amber-500/20 transition-all disabled:bg-neutral-800 disabled:text-neutral-500 cursor-pointer disabled:cursor-not-allowed text-sm"
          >
            {loading ? "Creating Account..." : "Get Started"}
          </button>
        </form>

        <p className="mt-6 text-xs text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-500 hover:text-amber-400 font-medium transition-colors ml-1">
            Sign In
          </Link>
        </p>
      </div>
      
    </div>
  );
}

export default Page;
