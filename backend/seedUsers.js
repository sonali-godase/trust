const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");
const Trustee = require("./models/Trustee");
const Devotee = require("./models/Devotee");
const BranchManager = require("./models/BranchManager");
const DocumentHandler = require("./models/DocumentHandler");
const Branch = require("./models/Branch");
const connectDB = require("./config/db");

dotenv.config();

const seedUsers = async () => {
  await connectDB();

  try {
    const defaultPassword = "password123"; // Plain text password for seed

    // Wipe existing users to ensure fresh password hashing
    await Admin.deleteMany({});
    await Trustee.deleteMany({});
    await Devotee.deleteMany({});
    await BranchManager.deleteMany({});
    await DocumentHandler.deleteMany({});

    // 1. Seed Admin
    let admin = await Admin.create({
      email: "admin@kolekarmath.org",
      password: defaultPassword,
      name: "Main System Admin",
      role: "Admin"
    });
    console.log("Admin seeded.");

    // 2. Seed Trustee
    let trustee = await Trustee.create({
      name: "Chief Trustee",
      email: "trustee@kolekarmath.org",
      mobile: "9876543210",
      designation: "President",
      address: "Trust Board Office",
      password: defaultPassword,
      role: "Trustee"
    });
    console.log("Trustee seeded.");

    // 3. Seed Devotee
    let devotee = await Devotee.create({
      name: "Shiva Bhakt",
      email: "devotee@example.com",
      mobile: "1234567890",
      address: "Ujjain",
      password: defaultPassword,
      isVerified: true, // Auto-verify for testing
      role: "Devotee"
    });
    console.log("Devotee seeded.");

    // 4. Create a dummy branch if not exists
    let branch = await Branch.findOne({ name: "Main Ujjain Branch" });
    if (!branch) {
      branch = await Branch.create({
        name: "Main Ujjain Branch",
        location: "Ujjain Temple Complex"
      });
      console.log("Branch seeded.");
    }

    // 5. Seed Branch Manager
    let manager = await BranchManager.create({
      name: "Ramesh Sharma",
      managerId: "BM-001",
      email: "manager@kolekarmath.org",
      mobile: "9876543211",
      branch: branch._id,
      password: defaultPassword,
      role: "BranchManager"
    });
    console.log("Branch Manager seeded.");

    // 6. Seed Document Handler
    let docHandler = await DocumentHandler.create({
      username: "clerk01",
      password: defaultPassword,
      role: "DocumentHandler"
    });
    console.log("Document Handler seeded.");

    console.log("Seeding complete!");
    process.exit(0);

  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedUsers();
