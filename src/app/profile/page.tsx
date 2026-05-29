"use client";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function page() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-2.5">
      Profile page
      <button
        className="bg-white text-black p-2 w-20 cursor-pointer"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  );
}

export default page;
