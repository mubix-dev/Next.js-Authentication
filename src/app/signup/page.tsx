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
      console.log(error.response?.data?.message)
        setLoading(false);
        toast.error(error.response?.data?.message || "Something went wrong")
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black text-white p-4">
      <div className="w-full max-w-md border-2 border-slate-200 rounded-2xl flex flex-col items-center p-6 bg-zinc-950 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 tracking-wide">Next Auth</h1>

        <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
          {/* Username Input */}
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-slate-300"
            >
              Username
            </label>
            <input
              className="w-full border border-slate-200 bg-transparent p-2.5 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
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
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-300"
            >
              Email
            </label>
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

          {/* Password Input */}
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-300"
            >
              Password
            </label>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold p-2.5 rounded-lg mt-2 hover:bg-slate-200 transition-colors disabled:bg-slate-400"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
