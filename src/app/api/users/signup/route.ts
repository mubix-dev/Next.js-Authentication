import connectDB from "@/config/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

await connectDB();

export async function POST(req: NextRequest) {
  try {
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
        { error: "User already exists!" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
        username,
        email,
        password:hashedPassword
    })

    const securedUser = await User.findOne({email : newUser.email}).select("-password");

    return NextResponse.json({
        message:"User created successfully!",
        success:true,
        createdUser: securedUser
    },{status:201})
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
