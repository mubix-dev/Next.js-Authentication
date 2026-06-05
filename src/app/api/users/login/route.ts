import connectDB from "@/config/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken"


export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const reqBody = await req.json();

    const {email, password } = reqBody;
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide complete details" },
        { status: 400 },
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not fond!" },
        { status: 400 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 400 },
      );
    }

    const securedUser = await User.findOne({email : user.email}).select("-password");

    const tokenData = {
        id:securedUser._id,
        username:securedUser.username,
        email:securedUser.email
    }

    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
    const response =  NextResponse.json({
        message:"User login successfully!",
        success:true,
        createdUser: securedUser
    },{status:200})
    
    response.cookies.set("token",token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:24 * 60 * 60
    })

    return response;

  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
