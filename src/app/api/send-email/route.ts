import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!email || !name || !service || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: `Your Photo Studio <${process.env.NEXT_PUBLIC_ADMIN_EMAIL}>`,
      to: [email],
      subject: `We've received your inquiry about ${service}`,
      react: EmailTemplate({ name, service, message }),
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
