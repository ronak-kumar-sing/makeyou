const sampleSubmissions = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    projectType: 'E-commerce Website',
    budget: '₹30,000 - ₹50,000',
    description: 'Looking to build a full-featured e-commerce platform with payment integration, product catalog, and user authentication.',
    timeline: '2-3 months'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@techstartup.com',
    phone: '+1 (555) 234-5678',
    projectType: 'SaaS Application',
    budget: '₹80,000+',
    description: 'Need a SaaS dashboard with subscription management, analytics, and multi-tenant architecture.',
    timeline: '4-6 months'
  },
  {
    name: 'Michael Chen',
    email: 'mchen@designstudio.com',
    phone: '+1 (555) 345-6789',
    projectType: 'Portfolio Website',
    budget: '₹10,000 - ₹20,000',
    description: 'Clean, modern portfolio website with animations and interactive elements to showcase design work.',
    timeline: '3-4 weeks'
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.r@ngoworld.org',
    phone: '+1 (555) 456-7890',
    projectType: 'NGO Website',
    budget: '₹20,000 - ₹30,000',
    description: 'Website for non-profit organization with donation integration, event calendar, and volunteer management.',
    timeline: '6-8 weeks'
  },
  {
    name: 'David Park',
    email: 'dpark@mobileapp.io',
    phone: '+1 (555) 567-8901',
    projectType: 'Mobile App',
    budget: '₹50,000 - ₹80,000',
    description: 'Cross-platform mobile app for food delivery with real-time tracking and payment processing.',
    timeline: '3-4 months'
  },
  {
    name: 'Lisa Wang',
    email: 'lisa.wang@consulting.com',
    phone: '+1 (555) 678-9012',
    projectType: 'Corporate Website',
    budget: '₹30,000 - ₹50,000',
    description: 'Professional corporate website for consulting firm with case studies, team profiles, and client portal.',
    timeline: '8-10 weeks'
  },
  {
    name: 'James Thompson',
    email: 'jthompson@ecommerce.net',
    phone: '+1 (555) 789-0123',
    projectType: 'Custom Web Application',
    budget: '₹80,000+',
    description: 'Custom inventory management system with API integrations, reporting, and multi-user access.',
    timeline: '5-6 months'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.s@edtech.in',
    phone: '+91 98765 43210',
    projectType: 'Learning Platform',
    budget: '₹50,000 - ₹80,000',
    description: 'Online learning platform with video courses, quizzes, progress tracking, and certification.',
    timeline: '3-4 months'
  }
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  let successCount = 0;
  let failCount = 0;

  for (const submission of sampleSubmissions) {
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission)
      });

      if (response.ok) {
        successCount++;
        console.log(`✅ ${successCount}. Seeded: ${submission.name} - ${submission.projectType}`);
      } else {
        failCount++;
        const error = await response.text();
        console.error(`❌ Failed to seed ${submission.name}: ${error}`);
      }
    } catch (error) {
      failCount++;
      console.error(`❌ Error seeding ${submission.name}:`, error.message);
    }
  }

  console.log(`\n📊 Seeding Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📈 Total: ${sampleSubmissions.length}`);
  console.log('\n🎉 Database seeding completed!\n');
}

// Check if server is running
fetch('http://localhost:3000')
  .then(() => seedDatabase())
  .catch(() => {
    console.error('❌ Error: Development server is not running!');
    console.log('💡 Please run "npm run dev" first, then run this seed script.\n');
    process.exit(1);
  });
