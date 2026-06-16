const bcrypt = require('bcryptjs');

// List of seed users for development
const seedUsers = [
  {
    name: 'Super Admin',
    email: 'admin@aashram.com',
    userId: 'admin',
    password: 'Admin@123',
    phone: '1111111111',
    role: 'Admin', // optional, just for reference
  },
  {
    name: 'Trust Manager',
    email: 'manager@aashram.com',
    userId: 'manager',
    password: 'Manager@123',
    phone: '2222222222',
    role: 'Manager',
  },
  {
    name: 'Branch Manager',
    email: 'branch@aashram.com',
    userId: 'branch',
    password: 'Branch@123',
    phone: '3333333333',
    role: 'BranchManager',
  },
  {
    name: 'Author',
    email: 'author@aashram.com',
    userId: 'author',
    password: 'Author@123',
    phone: '4444444444',
    role: 'Author',
  },
  {
    name: 'Devotee',
    email: 'devotee@aashram.com',
    userId: 'devotee',
    password: 'Devotee@123',
    phone: '5555555555',
    role: 'User',
  },
];

/**
 * Create seed users if they do not already exist.
 * This runs only when NODE_ENV !== "production".
 */
async function createSeedUsers() {
  if (process.env.NODE_ENV === 'production') {
    console.log('[SEED] Skipping seed user creation in production.');
    return;
  }

  try {
    for (const seed of seedUsers) {
      const existing = await User.findOne({ email: seed.email.toLowerCase() });
      if (existing) {
        console.log(`[SEED] ${seed.name} account ready`);
        continue;
      }
      const passwordHash = await bcrypt.hash(seed.password, 10);
      const newUser = new User({
        name: seed.name,
        email: seed.email.toLowerCase(),
        userId: seed.userId.toUpperCase(),
        phone: seed.phone,
        passwordHash,
        isEmailVerified: true, // bypass email verification / OTP for seeded accounts
      });
      await newUser.save();
      console.log(`[SEED] ${seed.name} account ready`);
    }
  } catch (err) {
    console.error('[SEED] Error creating seed users:', err);
  }
}

module.exports = { createSeedUsers };
