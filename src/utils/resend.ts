"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendEmail = async (formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) => {
  const { name, email, phone, service, message } = formData;

  const emailContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Service Interested:</strong> ${service}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  await resend.emails.send({
    to: process.env.NEXT_PUBLIC_ADMIN_EMAIL as string,
    from: "${name} <onboarding@resend.dev>",
    subject: "New Contact Form Submission",
    html: emailContent,
  });
};
