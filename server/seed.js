const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('./models/Service');
const Project = require('./models/Project');
const FAQ = require('./models/FAQ');
const TeamMember = require('./models/TeamMember');
const Setting = require('./models/Setting');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/britsee';

async function seedData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    // 1. Clear existing data
    await Promise.all([
      Service.deleteMany({}),
      Project.deleteMany({}),
      FAQ.deleteMany({}),
      TeamMember.deleteMany({}),
      Setting.deleteMany({}),
    ]);
    console.log('Cleared existing data.');

    // 2. Settings / Brand Metadata
    await Setting.create({
      siteName: 'Britsee',
      tagline: 'Crafting Digital Realities',
      contactEmail: 'hello@britsee.co',
      supportEmail: 'support@britsee.co',
      missionStatement: 'At Britsee, we push the boundaries of technology to create immersive, high-impact digital experiences powered by advanced AI and strategic engineering.',
    });

    // 3. Services
    const services = [
      {
        name: 'AI Automation',
        description: 'Building custom AI agents and automated workflows to scale your business operations.',
        category: 'Development',
        basePrice: 1500,
        features: ['Custom AI Agents', 'Workflow Integration', 'Groq/OpenAI Support'],
      },
      {
        name: 'Web Development',
        description: 'High-performance, modern web applications built with React, Next.js, and Node.js.',
        category: 'Development',
        basePrice: 2500,
        features: ['Responsive Design', 'SEO Optimization', 'Scalable Architecture'],
      },
      {
        name: 'Mobile App Development',
        description: 'Cross-platform mobile apps that provide a seamless user experience on iOS and Android.',
        category: 'Development',
        basePrice: 3500,
        features: ['React Native / Flutter', 'App Store Deployment', 'Real-time Features'],
      },
    ];
    await Service.insertMany(services);

    // 4. Projects (Portfolio)
    const projects = [
      {
        title: 'Britsee Assistant',
        description: 'Our proprietary AI-powered strategic engine and chatbot.',
        techStack: ['Node.js', 'React', 'MongoDB', 'Groq'],
        link: 'https://assistant.britsee.co',
        status: 'Live',
      },
    ];
    await Project.insertMany(projects);

    // 5. Team
    const team = [
      {
        name: 'Lead Architect',
        role: 'Founder & CTO',
        bio: 'Visionary engineer specializing in AI and cloud architecture.',
      },
    ];
    await TeamMember.insertMany(team);

    // 6. FAQ
    const faqs = [
      {
        question: 'What is Britsee?',
        answer: 'Britsee is a high-end technology agency focusing on AI automation, web development, and digital strategy.',
      },
      {
        question: 'How do I book a call?',
        answer: 'You can book a free discovery call directly through our AI assistant by asking to "schedule a call".',
      },
    ];
    await FAQ.insertMany(faqs);

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seedData();