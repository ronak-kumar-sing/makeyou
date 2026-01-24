import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Define schema again for server-side validation
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate data
    const validation = formSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const { name, email, phone, message } = validation.data;

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
          range: 'Sheet1!A:E', // Assuming Sheet1 and Columns A-E
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [new Date().toISOString(), name, email, phone ? `'${phone}` : '', message],
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

    // 2. Send Confirmation Email (Nodemailer)
    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Boolean(process.env.SMTP_SECURE) || false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
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
                <title>Thank You for Contacting MakeYou Digital</title>
                <style>
                  body { margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Arial', sans-serif; }
                  .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                  .header { background-color: #000000; color: #ffffff; padding: 30px 20px; text-align: center; }
                  .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
                  .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
                  .message-box { background-color: #f8f9fa; border-left: 4px solid #000000; padding: 20px; margin: 20px 0; font-style: italic; color: #555555; }
                  .footer { background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eaeaea; }
                  .button { display: inline-block; padding: 12px 24px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 4px; margin-top: 20px; font-weight: bold; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>MakeYou Digital</h1>
                  </div>
                  <div class="content">
                    <p style="font-size: 18px; margin-bottom: 20px;">Hi ${name},</p>
                    <p>Thank you for reaching out! I've received your message and appreciate you contacting us.</p>
                    
                    <div class="message-box">
                      "${message}"
                    </div>
                    
                    <p>I will review your inquiry and get back to you shortly, usually within 24 hours.</p>
                    
                    <a href="https://makeyou.online" class="button">Visit Our Website</a>
                  </div>
                  <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} MakeYou Digital. All rights reserved.</p>
                    <p>Founder: Ronak Kumar Singh</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        // Optional: Email to Admin
        await transporter.sendMail({
          from: `"MakeYou Bot" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Send to self
          subject: `New Lead: ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        })

        console.log("Emails sent");
      } else {
        console.warn("SMTP credentials missing, skipping email.");
      }
    } catch (emailError) {
      console.error("Email Error:", emailError);
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Handler Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
