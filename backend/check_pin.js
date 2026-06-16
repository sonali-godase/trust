const mongoose = require('mongoose');
require('dotenv').config();
const SystemSettings = require('./models/SystemSettings.js');

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    const settings = await SystemSettings.findOne();
    console.log("Settings found:", settings);
    if (settings) {
      console.log("PIN is:", settings.adminLoginPin);
      console.log("Type of PIN is:", typeof settings.adminLoginPin);
    } else {
      console.log("No settings found in DB.");
    }
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

check();
