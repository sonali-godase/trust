const mongoose = require('mongoose');
require('dotenv').config();
const SystemSettings = require('./models/SystemSettings.js');

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const pin = "log1008";
    
    let settings = await SystemSettings.findOne();
    if (!settings) {
      console.log("Settings is null. Calling create()...");
      settings = await SystemSettings.create({ adminLoginPin: 'log1008' });
      console.log("Created settings:", settings);
    } else {
      console.log("Settings found:", settings);
    }

    if (settings.adminLoginPin === pin) {
      console.log("PIN verified successfully");
    } else {
      console.log("Incorrect PIN. DB pin is:", settings.adminLoginPin, "Provided pin is:", pin);
    }

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

test();
