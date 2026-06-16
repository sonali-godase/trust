const mongoose = require('mongoose');
const Document = require('./models/Document');
require('dotenv').config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const docs = await Document.find({});
  console.log("Documents found:", docs.length);
  if (docs.length > 0) {
    console.log("First doc:", docs[0]);
  }
  process.exit(0);
}
check();
