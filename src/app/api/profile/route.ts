import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: Request, res: NextResponse) {
  return NextResponse.json({ message: "holaaa" });
}
