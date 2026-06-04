"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "Verifying your email, please wait...",
  );

  useEffect(() => {
    const verificationToken = params.verificationToken as any;
    const hexRegex = /^[a-f0-9]{64}$/i;

    if (!verificationToken || !hexRegex.test(verificationToken)) {
      setStatus("error");
      setMessage("The verification link format is invalid.");
      return;
    }

    if (!verificationToken) {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const result = await axios.post(
          `/api/users/verify-email/${verificationToken}`,
          {},
          { withCredentials: true },
        );

        setStatus("success");
        setMessage(
          result.data?.message || "Your email has been successfully verified!",
        );

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error.response?.data?.error ||
            error.response?.data?.message ||
            "An unexpected error occurred. Please try again later.",
        );
        console.log(error.response?.data?.message);
      }
    };

    verifyEmail();
  }, [params.verificationToken, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md rounded-lg bg-zinc-300 p-8 text-center shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Account Verification
        </h1>

        {status === "loading" && (
          <div className="space-y-4">
            <div className="text-black font-bold">Loading...</div>
            <p className="text-gray-600">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
              ✓
            </div>
            <p className="text-green-600 font-medium">{message}</p>
            <p className="text-xs text-gray-400">Redirecting you to login...</p>
            <Link
              href="/login"
              className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
            >
              Go to Login immediately
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
              ✕
            </div>
            <p className="text-red-600 font-medium">{message}</p>
            <Link
              href="/resend-verification"
              className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
            >
              Need a new link? Resend email
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
