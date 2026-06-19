"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { dataContext } from "@/app/context/UserContextProvider";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(dataContext);


  

  const handleLogin = async(e:any)=>{
    e.preventDefault()
    setLoading(true);
    try {
      const result = await axios.post("/api/users/login",user)
      setUserData?.(result.data.createdUser)
      toast.success(result.data?.message)
      setLoading(false);
      router.push(`/dashboard`)
    } catch (error:any) {
      console.log(error.response?.data?.message)
      toast.error(error.response?.data?.message || "Something went wrong!")
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-neutral-950 text-white selection:bg-amber-500 selection:text-black p-4">
      
      <div className="w-full max-w-md border border-neutral-900 rounded-2xl flex flex-col items-center p-8 bg-neutral-900/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-black text-sm">
            N
          </div>
          <span className="text-xl font-bold tracking-tight">nextAuth</span>
        </div>

        <h2 className="text-lg font-medium text-neutral-400 mb-6 text-center">Sign in to your account</h2>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 relative z-10">
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
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-neutral-400"
              >
                Password
              </label>
              <Link 
                href="/forgot-password" 
                className="text-xs text-neutral-500 hover:text-amber-500 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>
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

          {/* Core Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold p-3 rounded-xl mt-4 shadow-lg shadow-amber-500/10 hover:bg-white/80 hover:shadow-amber-500/20 transition-all disabled:bg-neutral-800 disabled:text-neutral-500 cursor-pointer disabled:cursor-not-allowed text-sm"
          >
            {loading ? "Verifying..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-xs text-neutral-500">
          Don't have an account?{" "}
          <Link href="/signup" className="text-white hover:text-white/70 font-medium transition-colors ml-1">
            Get Started
          </Link>
        </p>
      </div>

    </div>
  );
}

export default Page;