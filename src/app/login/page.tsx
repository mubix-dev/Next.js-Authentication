"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async(e:any)=>{
    e.preventDefault()
    setLoading(true);
    try {
      const result = await axios.post("/api/users/login",user)
      console.log(result.data);
      toast.success(result.data?.message)
      setLoading(false);
      router.push(`/profile/${result.data.createdUser.username}`)
    } catch (error:any) {
      console.log(error.response?.data?.message)
      toast.error(error.response?.data?.message || "Something went wrong!")
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black text-white p-4">
      <div className="w-full max-w-md border-2 border-slate-200 rounded-2xl flex flex-col items-center p-6 bg-zinc-950 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 tracking-wide">Next Auth</h1>
        
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
            <input
              className="w-full border border-slate-200 bg-transparent p-2.5 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
              type="email"
              id="email"
              name="email"
              placeholder="john_doe@example.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
            <input
              className="w-full border border-slate-200 bg-transparent p-2.5 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
              type="password"
              id="password"
              name="password"
              placeholder="*********"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-semibold p-2.5 rounded-lg mt-2 hover:bg-slate-200 transition-colors disabled:bg-slate-400"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;