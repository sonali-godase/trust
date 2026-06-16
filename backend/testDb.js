const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri).then(async () => {
    console.log("Connected to MongoDB.");
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));

    // check if there's any data in mathhistories or lineagemembers
    const MathHistory = require('./models/MathHistory');
    const LineageMember = require('./models/LineageMember');

    const historyCount = await MathHistory.countDocuments();
    const lineageCount = await LineageMember.countDocuments();
    
    console.log(`MathHistories count: ${historyCount}`);
    console.log(`LineageMembers count: ${lineageCount}`);

    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
