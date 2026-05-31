import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const isAuth = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const userId = decodedToken.id;

    return userId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
