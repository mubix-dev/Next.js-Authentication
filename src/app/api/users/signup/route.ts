import connectDB from "@/config/db";
import { emailVerificationMailContent, sendEmail } from "@/helpers/mail";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto"

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const reqBody = await req.json();

    const { username, email, password } = reqBody;
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please provide complete details" },
        { status: 400 },
      );
    }
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const verificationToken = crypto.randomBytes(32).toString("hex");
    newUser.verificationToken = verificationToken;
    newUser.verificationTokenExpiry = Date.now() + 5 * 60 * 1000;
    await newUser.save();

    await sendEmail({
      email: newUser.email,
      subject: "Please verify your email",
      html: emailVerificationMailContent(
        newUser.username,
        `${process.env.DOMAIN_URL}/verify-email/${verificationToken}`,
      ),
    });

    const securedUser = await User.findOne({ email: newUser.email }).select(
      "-password -verificationToken",
    );

    return NextResponse.json(
      {
        message: "User created successfully!",
        success: true,
        createdUser: securedUser,
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.log(err.message)
    return NextResponse.json({ message:err.message}, { status: 500 });
  }
}
