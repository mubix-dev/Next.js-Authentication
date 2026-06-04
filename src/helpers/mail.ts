import nodemailer from "nodemailer";

export async function sendEmail(options: any) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: false, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL, 
    to: options.email,          
    subject: options.subject,    
    html: options.html,          
  };

  try {
    await transporter.sendMail(mailOptions);
    
  } catch (error) {
    console.log(error)
  }

}

export function emailVerificationMailContent(username: any, verificationUrl: any) {
  return `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h2>Confirm Your Email</h2>
      <p>Hi ${username},</p>
      <p>Thank you for registering! Please click the button below to verify your email address:</p>
      <a href="${verificationUrl}" style="background: #041470; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px; display: inline-block; margin: 15px 0;">
        Verify Email
      </a>
      <p>If you didn't request this, you can just ignore this email.</p>
    </div>
  `;
}


export function forgotPasswordMailContent(username: any, passwordResetUrl: any) {
  return `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h2>Reset Your Password</h2>
      <p>Hi ${username},</p>
      <p>We received a request to reset your password. Click the button below to continue:</p>
      <a href="${passwordResetUrl}" style="background: #22BC66; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px; display: inline-block; margin: 15px 0;">
        Reset Password
      </a>
      <p>This link will expire soon. If you didn't ask for a reset, ignore this email.</p>
    </div>
  `;
}