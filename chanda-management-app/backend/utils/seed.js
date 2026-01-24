const User = require('../models/User');
const Donation = require('../models/Donation');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Donation.deleteMany({});

    // Create sample users
    const users = await User.insertMany([
      {
        email: 'rahat@example.com',
        username: 'Rahat Khan',
        password: 'password123',
        tier: 'basic',
        totalDonated: 125000,
      },
      {
        email: 'fatima@example.com',
        username: 'Fatima Ahmed',
        password: 'password123',
        tier: 'basic',
        totalDonated: 95000,
      },
      {
        email: 'akmal@example.com',
        username: 'Akmal Hossain',
        password: 'password123',
        tier: 'basic',
        totalDonated: 85000,
      },
      {
        email: 'nasrin@example.com',
        username: 'Nasrin Akter',
        password: 'password123',
        tier: 'basic',
        totalDonated: 75000,
      },
      {
        email: 'karim@example.com',
        username: 'Karim Uddin',
        password: 'password123',
        tier: 'basic',
        totalDonated: 65000,
      },
    ]);

    const districts = [
      'Dhaka',
      'Chittagong',
      'Sylhet',
      'Khulna',
      'Rajshahi',
      'Barisal',
      'Rangpur',
      'Mymensingh',
    ];

    const professions = [
      'Doctor',
      'Engineer',
      'Teacher',
      'Student',
      'Businessman',
      'Unemployed',
      'Others',
    ];

    // Create sample donations
    const donations = [];
    for (let i = 0; i < 50; i++) {
      donations.push({
        name: users[Math.floor(Math.random() * users.length)].username,
        profession: professions[Math.floor(Math.random() * professions.length)],
        district: districts[Math.floor(Math.random() * districts.length)],
        amount:
          Math.floor(Math.random() * 50000) + 5000 +
          (Math.floor(Math.random() * 3) * 1000),
        user: users[Math.floor(Math.random() * users.length)]._id,
      });
    }

    await Donation.insertMany(donations);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedData;
