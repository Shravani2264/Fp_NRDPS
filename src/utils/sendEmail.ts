import { Resend } from 'resend';

const resend = new Resend('re_123456789');

resend.apiKeys.create({ name: 'Production' });

export async function sendEmailNotification(formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error("Missing NEXT_PUBLIC_ADMIN_EMAIL in environment variables.");
  }

  console.log("📩 Preparing to send email...");
  console.log("🔍 Resend API Key:", process.env.NEXT_PUBLIC_RESEND_API_KEY ? "Loaded" : "Missing");
  console.log("📨 Sending to:", adminEmail);

  try {
    const response = await resend.emails.send({
      from: "contact@yourdomain.com",
      to: adminEmail,
      subject: "New Contact Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Service Interested In:</strong> ${formData.service}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
    });

    console.log("✅ Email sent successfully!", response);
  } catch (error: any) {
    console.error("❌ Error sending email:", error);

    if (error.response) {
      console.error("📜 Response Data:", error.response.data);
    }

    throw new Error("Failed to send email. See logs for details.");
  }
}
