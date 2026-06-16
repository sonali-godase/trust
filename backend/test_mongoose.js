const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const Annadaan = require('./models/Annadaan');
  const email = 'akankshamali299@gmail.com';
  const query = { $or: [{ userId: new mongoose.Types.ObjectId() }, { email: email }] };
  const docs = await Annadaan.find(query);
  console.log('Docs found with or:', docs.length);
  const docs2 = await Annadaan.find({ email });
  console.log('Docs found with email:', docs2.length);
  mongoose.disconnect();
});
