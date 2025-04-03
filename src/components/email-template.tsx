import * as React from "react";

interface EmailTemplateProps {
  name: string;
  service: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  service,
  message,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
    <h2>Hello {name},</h2>
    <p>Thank you for reaching out to us!</p>
    <p>We have received your inquiry regarding our <strong>{service}</strong> service. Our team will get back to you shortly.</p>
    <p><strong>Your Message:</strong></p>
    <blockquote style={{ fontStyle: "italic", borderLeft: "4px solid #ccc", paddingLeft: "10px" }}>
      {message}
    </blockquote>
    <p>Best regards,<br /><strong>Your Digital Photo Studio</strong></p>
  </div>
);
