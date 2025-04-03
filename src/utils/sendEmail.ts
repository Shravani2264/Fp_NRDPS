import emailjs from '@emailjs/browser';


export async function sendEmail(formData: { name: string; email: string; phone: string; service: string; message: string }) {
  try {
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        name: formData.name,
        email: formData.email, // This is the user's email (for reference)
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        admin_email: process.env.NEXT_PUBLIC_ADMIN_EMAIL, // Admin's email from environment variables
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    console.log("Email sent successfully to admin:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}
