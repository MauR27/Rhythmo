import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import User from "@/models/users";
import { getSession } from "next-auth/react";
import { NextApiRequest } from "next";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { name, email, profilePicture, password, id, confirmPassword } =
      await req.json();

    const userID = id;

    const user = await User.findOne({ _id: userID });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    user.email = email || user.email;
    user.name = name || user.name;

    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400, statusText: "Email already exists" }
    );
  }
}
