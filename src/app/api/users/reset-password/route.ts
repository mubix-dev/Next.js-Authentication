import connectDB from "@/config/db";
import { isAuth } from "@/helpers/isAuth";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const reqBody = await req.json();
    const { currPassword, newPassword } = reqBody;

    if (!newPassword) {
      return NextResponse.json(
        { message: "Please provide a valid new password" },
        { status: 400 },
      );
    }
    if (!currPassword) {
      return NextResponse.json(
        { message: "Please provide your current password" },
        { status: 400 },
      );
    }
    const userId = await isAuth(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Session not found!" },
        { status: 401 },
      );
    }
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isCurrPasswordValid = await bcrypt.compare(currPassword,user.password)

    if(!isCurrPasswordValid){
        return NextResponse.json({ message: "The current password you entered is incorrect" }, { status: 400 });
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
