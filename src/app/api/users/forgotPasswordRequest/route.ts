import connectDB from "@/config/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto"
import { forgotPasswordMailContent, sendEmail } from "@/helpers/mail";
export async function POST(
  req: NextRequest,
) {
  try {
    await connectDB();

    const reqBody = await req.json();
    const { email } = reqBody;
    
    if (!email) {
      return NextResponse.json(
        { message: "Please provide your valid email" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "user not found" },
        { status: 404 },
      );
    }

    const forgotPasswordToken = crypto.randomBytes(32).toString("hex")

    user.forgotPasswordToken = forgotPasswordToken; 
    user.forgotPasswordTokenExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail({
          email: user.email,
          subject: "Please verify your email",
          html: forgotPasswordMailContent(
            user.username,
            `${process.env.DOMAIN_URL}/forgot-password/${forgotPasswordToken}`,
          ),
        });

    return NextResponse.json(
      {
        message: "Link sent to your email!",
        success: true,
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

