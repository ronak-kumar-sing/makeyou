// Test Google Sheets Integration
require('dotenv').config({ path: '.env' });
const { google } = require('googleapis');

async function testGoogleSheets() {
  console.log('🔍 Testing Google Sheets Integration...\n');

  // Check if environment variables are set
  console.log('📋 Checking environment variables:');
  console.log('✅ GOOGLE_SHEETS_CLIENT_EMAIL:', process.env.GOOGLE_SHEETS_CLIENT_EMAIL ? 'Set' : '❌ Missing');
  console.log('✅ GOOGLE_SHEETS_PRIVATE_KEY:', process.env.GOOGLE_SHEETS_PRIVATE_KEY ? 'Set' : '❌ Missing');
  console.log('✅ GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID ? 'Set' : '❌ Missing');

  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error('\n❌ Missing required environment variables');
    process.exit(1);
  }

  try {
    console.log('\n🔐 Authenticating with Google...');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    console.log('✅ Authentication successful\n');

    // Get spreadsheet info
    console.log('📊 Fetching spreadsheet info...');
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });
    console.log('✅ Spreadsheet Title:', spreadsheet.data.properties.title);
    console.log('✅ Sheets:', spreadsheet.data.sheets.map(s => s.properties.title).join(', '));

    // Test write operation
    console.log('\n✍️  Testing write operation...');
    const testData = [
      [
        new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        'Test Name',
        'test@example.com',
        '9876543210',
        'This is a test message from the verification script'
      ]
    ];

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: testData,
      },
    });

    console.log('✅ Successfully wrote test data to sheet!');
    console.log('✅ Updated range:', result.data.updates.updatedRange);
    console.log('✅ Rows added:', result.data.updates.updatedRows);

    // Read back the data
    console.log('\n📖 Reading data to verify...');
    const readResult = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E',
    });

    const rows = readResult.data.values;
    if (rows && rows.length) {
      console.log('✅ Total rows in sheet:', rows.length);
      console.log('✅ Last row:', rows[rows.length - 1]);
    }

    console.log('\n✅ All tests passed! Google Sheets integration is working correctly! 🎉');
    console.log('\n💡 You can now check your Google Sheet at:');
    console.log(`   https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/edit`);

  } catch (error) {
    console.error('\n❌ Error testing Google Sheets:', error.message);
    if (error.code === 403) {
      console.error('\n🔧 Permission Error: Make sure you have shared your Google Sheet with:');
      console.error(`   ${process.env.GOOGLE_SHEETS_CLIENT_EMAIL}`);
      console.error('\n   Steps to fix:');
      console.error('   1. Open your Google Sheet');
      console.error('   2. Click "Share" button');
      console.error('   3. Add the service account email above');
      console.error('   4. Give it "Editor" permissions');
    }
    process.exit(1);
  }
}

testGoogleSheets();
