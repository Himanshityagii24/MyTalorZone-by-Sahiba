const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.NEW_PROJECT_DB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to database: ${process.env.NEW_PROJECT_DB}`);
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
