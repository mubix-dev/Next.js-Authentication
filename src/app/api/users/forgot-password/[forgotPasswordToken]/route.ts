import connectDB from "@/config/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ forgotPasswordToken: string }> },
) {
  try {
    await connectDB();

    const { forgotPasswordToken } = await params;
    const reqBody = await req.json();
    const { newPassword } = reqBody;

    if (!forgotPasswordToken) {
      return NextResponse.json(
        { message: "Forgot password token is missing" },
        { status: 400 },
      );
    }

    if (!newPassword) {
      return NextResponse.json(
        { message: "Please provide a valid new password" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ forgotPasswordToken });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid token or user does not exist" },
        { status: 400 },
      );
    }

    if (user.forgotPasswordTokenExpiry < Date.now()) {
      return NextResponse.json(
        { message: "The link has expired. Please request a new one." },
        { status: 400 },
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    user.forgotPasswordToken = undefined; 
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Your password has been successfully reset!",
        success: true,
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

