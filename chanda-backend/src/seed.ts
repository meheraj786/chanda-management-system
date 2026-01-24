import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User, { IUser } from './models/User';
import Donation, { IDonation } from './models/Donation';

dotenv.config();

const districts: string[] = [
  "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Jamalpur", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Mymensingh",
  "Narayanganj", "Narsingdi", "Netrokona", "Rajbari", "Shariatpur", "Sherpur", "Tangail", "Bogra", "Joypurhat", "Naogaon",
  "Natore", "Nawabganj", "Pabna", "Rajshahi", "Sirajganj", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari",
  "Panchagarh", "Rangpur", "Thakurgaon", "Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Bandarban",
  "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali",
  "Rangamati", "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna",
  "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"
];
const professions: string[] = ["Doctor", "Engineer", "Teacher", "Student", "Businessman", "Unemployed", "Others"];

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected for Seeding...');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

const importData = async (): Promise<void> => {
  try {
    await User.deleteMany();
    await Donation.deleteMany();

    const users: IUser[] = await User.insertMany([
      { username: 'John Doe', email: 'john@gmail.com', password: 'password123' },
      { username: 'Jane Smith', email: 'jane@gmail.com', password: 'password123' },
      { username: 'Peter Jones', email: 'peter@gmail.com', password: 'password123' },
    ]);

    const donations: IDonation[] = [];
    for (let i = 0; i < 50; i++) {
        const user = Math.random() > 0.5 ? users[Math.floor(Math.random() * users.length)] : null;
        donations.push({
            name: user ? user.username || `Guest User ${i}` : `Guest User ${i}`,
            profession: professions[Math.floor(Math.random() * professions.length)],
            district: districts[Math.floor(Math.random() * districts.length)],
            amount: Math.floor(Math.random() * 5000) + 100,
            user: user ? user._id : undefined,
            date: new Date(),
        });
    }

    await Donation.insertMany(donations);

    console.log('Data Imported!');
    process.exit();
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
};

const destroyData = async (): Promise<void> => {
  try {
    await User.deleteMany();
    await Donation.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
};

const run = async (): Promise<void> => {
    await connectDB();
    if (process.argv[2] === '-d') {
        await destroyData();
    } else {
        await importData();
    }
}

run();
