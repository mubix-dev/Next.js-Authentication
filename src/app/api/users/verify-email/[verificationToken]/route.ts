import connectDB from "@/config/db";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ verificationToken: string }> },
) {
  try {
    await connectDB();

    const { verificationToken } = await params;

    

    if (!verificationToken) {
      return NextResponse.json(
        { message: "Verification token is missing" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ verificationToken });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid token or user does not exist" },
        { status: 400 },
      );
    }

    if (user.verificationTokenExpiry < Date.now()) {
      return NextResponse.json(
        { message: "Verification link has expired. Please request a new one." },
        { status: 400 },
      );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Your email has been successfully verified!",
        success: true,
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
