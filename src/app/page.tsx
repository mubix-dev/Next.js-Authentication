"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { dataContext } from "./context/UserContextProvider";

export default function Home() {
  const { userData, loading } = useContext(dataContext);

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white selection:bg-amber-500 selection:text-black">
      
      <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-neutral-900">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black">
            N
          </div>
          <span className="text-xl font-bold tracking-tight">nextAuth</span>
        </div>
        

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-20 h-8 bg-neutral-900 animate-pulse rounded" />
          ) : userData ? (
            <Link 
              href="/dashboard" 
              className="text-sm bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="text-sm bg-amber-500 text-black font-semibold px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="w-full h-100 flex justify-center items-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-neutral-400">
          Welcome to nextAuth
        </h1>
      </div>

      <footer className="w-full border-t border-neutral-900 bg-neutral-950 text-neutral-500 text-xs py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>&copy; {new Date().getFullYear()} nextAuth Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}