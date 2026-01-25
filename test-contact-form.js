// Test Complete Contact Form Integration (Google Sheets + Email)
require('dotenv').config({ path: '.env' });
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

async function testContactForm() {
  console.log('🔍 Testing Complete Contact Form Integration...\n');

  const testData = {
    name: 'Test User',
    email: 'ronakkumar20062006@gmail.com', // Using your email for testing
    phone: '+91 7009097789',
    callbackTime: 'Morning (9 AM - 12 PM)',
    message: 'This is a test message to verify both Google Sheets and Email integration are working properly.'
  };

  // Test 1: Google Sheets
  console.log('📊 Test 1: Google Sheets Integration');
  console.log('═'.repeat(50));
  try {
    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.log('❌ Missing Google Sheets credentials');
      return;
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          testData.name,
          testData.email,
          testData.phone,
          testData.message,
          testData.callbackTime
        ]],
      },
    });

    console.log('✅ Successfully wrote to Google Sheet!');
    console.log('   Updated:', result.data.updates.updatedRange);
    console.log('   View at: https://docs.google.com/spreadsheets/d/' + process.env.GOOGLE_SHEET_ID);
  } catch (error) {
    console.log('❌ Google Sheets Error:', error.message);
  }

  // Test 2: Email
  console.log('\n📧 Test 2: Email Integration');
  console.log('═'.repeat(50));
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('❌ Missing SMTP credentials');
      console.log('   SMTP_HOST:', process.env.SMTP_HOST ? '✅' : '❌');
      console.log('   SMTP_USER:', process.env.SMTP_USER ? '✅' : '❌');
      console.log('   SMTP_PASS:', process.env.SMTP_PASS ? '✅' : '❌');
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Test connection
    console.log('🔐 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified!');

    // Send test email
    console.log('📨 Sending test email...');
    const info = await transporter.sendMail({
      from: `"MakeYou Digital" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: testData.email,
      subject: "✅ Test Email - MakeYou Digital Contact Form",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
                    <tr>
                      <td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">MakeYou</h1>
                        <p style="margin: 8px 0 0 0; color: #a0a0a0; font-size: 14px; letter-spacing: 1px;">Digital Solutions</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 50px 40px;">
                        <h2 style="margin: 0 0 20px 0; color: #000000; font-size: 24px; font-weight: 600;">Hi ${testData.name}! 👋</h2>
                        <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">This is a <strong>test email</strong> to verify that your contact form integration is working perfectly!</p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                          <tr>
                            <td style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 5px solid #000000; border-radius: 8px; padding: 25px;">
                              <p style="margin: 0 0 10px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Message:</p>
                              <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6; font-style: italic;">"${testData.message}"</p>
                            </td>
                          </tr>
                        </table>
                        <p style="margin: 0 0 30px 0; color: #28a745; font-size: 18px; font-weight: 600; text-align: center;">✅ Email system is working perfectly!</p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
                          <tr>
                            <td style="text-align: center;">
                              <p style="margin: 0 0 5px 0; color: #000; font-size: 15px; font-weight: 600;">📱 +91 7009097789</p>
                              <p style="margin: 0; color: #000; font-size: 15px; font-weight: 600;">✉️ ronakkumar20062006@gmail.com</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="background: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                        <p style="margin: 0 0 10px 0; color: #333; font-size: 14px; font-weight: 600;">MakeYou Digital</p>
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

    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('   To:', testData.email);

  } catch (error) {
    console.log('❌ Email Error:', error.message);
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Authentication Error - Please check:');
      console.log('   1. Enable "Less secure app access" in Gmail (if using Gmail)');
      console.log('   2. Or generate an "App Password" from Google Account settings');
      console.log('   3. Update SMTP_PASS in .env with the app password');
    }
  }

  console.log('\n' + '═'.repeat(50));
  console.log('✅ Test Complete! Check your email and Google Sheet.');
  console.log('═'.repeat(50));
}

testContactForm();
