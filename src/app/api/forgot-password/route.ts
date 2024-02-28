import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/users";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export async function POST(req: Request) {
  const { email, name } = await req.json();

  await connectDB();
  const user = await User.findOne({ email: email });

  if (!user) {
    return NextResponse.json(
      { message: "Email doesn't exist" },
      { status: 409, statusText: "Email doesn't exist" }
    );
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpires = Date.now() + 3600000;

  user.resetToken = passwordResetToken;
  user.resetTokenExpires = passwordResetExpires;
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  let msg = {
    from: {
      email: "rhythmo372@gmail.com",
    },
    personalizations: [
      {
        to: [
          {
            email: email,
          },
        ],
        // prettier-ignore
        dynamic_template_data: {
          "button_url": resetUrl,
          "name": email
        },
      },
    ],
    templateId: "d-838c70ed9b3043498e090d3400b7d866",
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  sgMail
    .send(msg)
    .then(() => {
      return NextResponse.json(
        { message: "Reset password email was send!" },
        { status: 200 }
      );
    })
    .catch(async (error) => {
      user.resetToken = undefined;
      user.resetTokenExpires = undefined;
      await user.save();

      return NextResponse.json(
        { message: "Failed sending email, Try again!" },
        { status: 400 }
      );
    });

  try {
    await user.save();
    return NextResponse.json(
      { message: "Email was send to reset your password!" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 400, statusText: error.message }
      );
    }
  }
}
