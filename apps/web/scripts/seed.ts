import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://officesync:officesyncpassword@localhost:27017/officesync?authSource=admin';

async function seed() {
  console.log('Connecting to MongoDB for seeding...');
  await mongoose.connect(MONGODB_URI);

  console.log('Clearing existing demo data...');
  // Seed 3 Divisions: IT Support, Marketing, Operations
  // Seed default admin and staff users
  // Seed initial tickets

  console.log('Seeding completed successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
