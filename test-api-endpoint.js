// Test actual API endpoint (simulates real form submission)
const testApiEndpoint = async () => {
  console.log('🧪 Testing Actual Contact Form API Endpoint\n');
  console.log('═'.repeat(60));

  const testData = {
    name: 'Raj Kumar',
    email: 'ronakkumar20062006@gmail.com',
    phone: '+91 9876543210',
    callbackTime: 'Evening (5 PM - 8 PM)',
    message: 'I need a website for my salon in Delhi. Looking for a simple website with booking system. Budget is around ₹40,000. Please call me in the evening.'
  };

  console.log('📝 Submitting test data:');
  console.log('   Name:', testData.name);
  console.log('   Email:', testData.email);
  console.log('   Phone:', testData.phone);
  console.log('   Callback Time:', testData.callbackTime);
  console.log('   Message:', testData.message.substring(0, 50) + '...');
  console.log('\n⏳ Making API request...\n');

  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ API Response: Success!');
      console.log('   Status:', response.status);
      console.log('   Data:', result);
      console.log('\n📊 Check Google Sheet:');
      console.log('   https://docs.google.com/spreadsheets/d/1oBm-cOX6sRVFWW_aXEoPy09sxWPFzIKbxubiMwAv9jc/edit');
      console.log('\n📧 Check your email inbox for:');
      console.log('   1. Customer confirmation email');
      console.log('   2. Admin notification with lead details');
    } else {
      console.log('❌ API Error:', response.status);
      console.log('   Error:', result);
    }
  } catch (error) {
    console.log('❌ Request Failed:', error.message);
    console.log('\n💡 Make sure your Next.js dev server is running:');
    console.log('   npm run dev');
  }

  console.log('\n' + '═'.repeat(60));
};

testApiEndpoint();
