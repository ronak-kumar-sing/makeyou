import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ronakkumar20062006:0TEgrSDgpNCcRykm@cluster0.969t4yr.mongodb.net/makeyou';

// Define Submission Schema
const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  projectType: String,
  budget: String,
  description: String,
  timeline: String,
  createdAt: { type: Date, default: Date.now }
});

const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

const sampleSubmissions = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    projectType: 'E-commerce Website',
    budget: '₹30,000 - ₹50,000',
    description: 'Looking to build a full-featured e-commerce platform with payment integration, product catalog, and user authentication.',
    timeline: '2-3 months',
    createdAt: new Date('2024-11-15')
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@techstartup.com',
    phone: '+1 (555) 234-5678',
    projectType: 'SaaS Application',
    budget: '₹80,000+',
    description: 'Need a SaaS dashboard with subscription management, analytics, and multi-tenant architecture.',
    timeline: '4-6 months',
    createdAt: new Date('2024-11-20')
  },
  {
    name: 'Michael Chen',
    email: 'mchen@designstudio.com',
    phone: '+1 (555) 345-6789',
    projectType: 'Portfolio Website',
    budget: '₹10,000 - ₹20,000',
    description: 'Clean, modern portfolio website with animations and interactive elements to showcase design work.',
    timeline: '3-4 weeks',
    createdAt: new Date('2024-11-25')
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.r@ngoworld.org',
    phone: '+1 (555) 456-7890',
    projectType: 'NGO Website',
    budget: '₹20,000 - ₹30,000',
    description: 'Website for non-profit organization with donation integration, event calendar, and volunteer management.',
    timeline: '6-8 weeks',
    createdAt: new Date('2024-11-28')
  },
  {
    name: 'David Park',
    email: 'dpark@mobileapp.io',
    phone: '+1 (555) 567-8901',
    projectType: 'Mobile App',
    budget: '₹50,000 - ₹80,000',
    description: 'Cross-platform mobile app for food delivery with real-time tracking and payment processing.',
    timeline: '3-4 months',
    createdAt: new Date('2024-12-01')
  },
  {
    name: 'Lisa Wang',
    email: 'lisa.wang@consulting.com',
    phone: '+1 (555) 678-9012',
    projectType: 'Corporate Website',
    budget: '₹30,000 - ₹50,000',
    description: 'Professional corporate website for consulting firm with case studies, team profiles, and client portal.',
    timeline: '8-10 weeks',
    createdAt: new Date('2024-12-03')
  },
  {
    name: 'James Thompson',
    email: 'jthompson@ecommerce.net',
    phone: '+1 (555) 789-0123',
    projectType: 'Custom Web Application',
    budget: '₹80,000+',
    description: 'Custom inventory management system with API integrations, reporting, and multi-user access.',
    timeline: '5-6 months',
    createdAt: new Date('2024-12-05')
  },
  {
    name: 'Priya Sharma',
    email: 'priya.s@edtech.in',
    phone: '+91 98765 43210',
    projectType: 'Learning Platform',
    budget: '₹50,000 - ₹80,000',
    description: 'Online learning platform with video courses, quizzes, progress tracking, and certification.',
    timeline: '3-4 months',
    createdAt: new Date('2024-12-06')
  }
];

async function seed() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing submissions
    console.log('🗑️  Clearing existing submissions...');
    await Submission.deleteMany({});
    console.log('✅ Cleared existing data');

    // Insert sample submissions
    console.log('📝 Seeding sample submissions...');
    const result = await Submission.insertMany(sampleSubmissions);
    console.log(`✅ Successfully seeded ${result.length} submissions`);

    // Display seeded data
    console.log('\n📊 Seeded Submissions:');
    result.forEach((submission, index) => {
      console.log(`\n${index + 1}. ${submission.name}`);
      console.log(`   Email: ${submission.email}`);
      console.log(`   Project: ${submission.projectType}`);
      console.log(`   Budget: ${submission.budget}`);
      console.log(`   Timeline: ${submission.timeline}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

seed();
