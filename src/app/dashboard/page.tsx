"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { dataContext } from "../context/UserContextProvider";
function page() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  const {userData} = useContext(dataContext);
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-neutral-950 text-white selection:bg-amber-500 selection:text-black p-4">
      
      <div className="w-full max-w-md border border-neutral-900 rounded-2xl flex flex-col items-center p-8 bg-neutral-900/40 backdrop-blur-md shadow-2xl relative overflow-hidden text-center">
        {/* Ambient theme glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Dashboard Icon / Brand Header */}
        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl flex items-center justify-center font-bold text-xl mb-4 relative z-10">
          D
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-1 relative z-10">
          Dashboard Panel
        </h1>
        <p className="text-xs text-neutral-500 mb-8 tracking-wide uppercase">
          Authenticated Session Control
        </p>

        {/* Action Button Grid */}
        <div className="w-full flex flex-col gap-3 relative z-10">
          
          {/* Dynamic "My Profile" button conditionally rendered based on userData */}
          {userData && (
            <Link 
              href={`/dashboard/${userData._id}`}
              className="w-full bg-amber-500 text-black font-bold p-3 rounded-xl shadow-lg shadow-amber-500/5 hover:bg-amber-400 hover:shadow-amber-500/15 transition-all text-sm block text-center cursor-pointer"
            >
              My Profile
            </Link>
          )}

          {/* Logout Action Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 font-semibold p-3 rounded-xl transition-all text-sm cursor-pointer"
          >
            Logout Session
          </button>
          
        </div>

        {/* Footer Link to return safely back to landing page */}
        <p className="mt-8 text-xs text-neutral-600">
          Want to view the landing?{" "}
          <Link href="/" className="text-neutral-400 hover:text-white transition-colors ml-1">
            Back to Home
          </Link>
        </p>
      </div>

    </div>
  );
}

export default page;
