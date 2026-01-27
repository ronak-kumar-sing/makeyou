import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Define schema again for server-side validation
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  callbackTime: z.string().optional(),
  message: z.string().min(10),
});

// Create reusable transporter - optimized for serverless (Vercel)
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Timeouts for serverless environment
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  } as nodemailer.TransportOptions);
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate data
    const validation = formSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const { name, email, phone, callbackTime, message } = validation.data;

    // 1. Append to Google Sheets
    try {
      if (process.env.GOOGLE_SHEETS_CLIENT_EMAIL && process.env.GOOGLE_SHEETS_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Sheet1!A1', // Start from A1 to ensure proper alignment
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), name, email, phone || '', message, callbackTime || 'Not specified'],
            ],
          },
        });
        console.log("Appended to Google Sheet");
      } else {
        console.warn("Google Sheets credentials missing, skipping sheet append.");
      }
    } catch (sheetError) {
      console.error("Google Sheets Error:", sheetError);
      // Don't fail the request if sheets fails, but log it
    }

    // 2. Send Confirmation Email (Nodemailer) - Optimized for Vercel
    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = createTransporter();
        
        // Verify connection before sending (catches issues early)
        await transporter.verify().catch((err) => {
          console.warn('SMTP verification warning:', err.message);
        });

        // Email to User
        await transporter.sendMail({
          from: `"MakeYou Digital" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: email,
          subject: "Thank you for contacting MakeYou Digital",
          text: `Hi ${name},\n\nThanks for reaching out! I've received your message regarding:\n"${message}"\n\nI'll get back to you shortly.\n\nBest,\nRonak Kumar Singh`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Thank You - MakeYou Digital</title>
              </head>
              <body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
                  <tr>
                    <td>
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                          <td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">MakeYou</h1>
                            <p style="margin: 8px 0 0 0; color: #a0a0a0; font-size: 14px; letter-spacing: 1px;">Digital Solutions</p>
                          </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                          <td style="padding: 50px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #000000; font-size: 24px; font-weight: 600;">Hi ${name}! 👋</h2>
                            <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">Thank you for reaching out to <strong>MakeYou Digital</strong>! We've received your message and are excited to help your business grow online.</p>
                            
                            <!-- Message Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                              <tr>
                                <td style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 5px solid #000000; border-radius: 8px; padding: 25px;">
                                  <p style="margin: 0 0 10px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Message:</p>
                                  <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6; font-style: italic;">"${message}"</p>
                                </td>
                              </tr>
                            </table>
                            
                            <p style="margin: 0 0 30px 0; color: #333333; font-size: 16px; line-height: 1.6;">I'll personally review your inquiry and get back to you within <strong>24 hours</strong>. Meanwhile, feel free to check out our latest work!</p>
                            
                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                              <tr>
                                <td style="text-align: center;">
                                  <a href="https://makeyou.online" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #000000 0%, #2d2d2d 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s;">Visit Our Website →</a>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Contact Info -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
                              <tr>
                                <td style="text-align: center;">
                                  <p style="margin: 0 0 15px 0; color: #666; font-size: 14px; line-height: 1.5;">Need urgent help? Reach out directly:</p>
                                  <p style="margin: 0 0 5px 0; color: #000; font-size: 15px; font-weight: 600;">📱 +91 7009097789</p>
                                  <p style="margin: 0 0 10px 0; color: #000; font-size: 15px; font-weight: 600;">✉️ ronakkumar20062006@gmail.com</p>
                                  ${callbackTime ? `<p style="margin: 10px 0 0 0; padding: 12px; background: #f8f9fa; border-radius: 8px; color: #666; font-size: 13px;">⏰ Preferred callback time: <strong style="color: #000;">${callbackTime}</strong></p>` : ''}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                          <td style="background: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 10px 0; color: #333; font-size: 14px; font-weight: 600;">MakeYou Digital</p>
                            <p style="margin: 0 0 15px 0; color: #666; font-size: 13px; line-height: 1.5;">Affordable websites for Indian local businesses<br>Kirana stores · Salons · Clinics · Gyms · Cafes · Coaching Centers</p>
                            <p style="margin: 0; color: #999; font-size: 12px;">&copy; ${new Date().getFullYear()} MakeYou Digital. All rights reserved.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        });

        // Optional: Email to Admin
        await transporter.sendMail({
          from: `"MakeYou Bot" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Send to self
          subject: `🔔 New Lead: ${name}`,
          text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nPreferred Callback Time: ${callbackTime || 'Not specified'}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
              <h2 style="color: #000; margin-bottom: 20px;">🔔 New Lead from Website</h2>
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> ${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Not provided'}</p>
                <p><strong>⏰ Preferred Callback Time:</strong> <span style="background: #fff3cd; padding: 4px 8px; border-radius: 4px; font-weight: 600;">${callbackTime || 'Not specified'}</span></p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                <p><strong>Message:</strong></p>
                <p style="background: #f8f9fa; padding: 15px; border-left: 4px solid #000; border-radius: 4px;">${message}</p>
              </div>
            </div>
          `,
        });

        console.log("Emails sent successfully");
        
        // Close the transporter connection (important for serverless)
        transporter.close();
      } else {
        console.warn("SMTP credentials missing, skipping email.");
      }
    } catch (emailError: any) {
      console.error("Email Error:", emailError?.message || emailError);
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Handler Error:", error?.message || error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
