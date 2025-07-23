require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const { mockUsers } = require('./mockUsers');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB for seeding');
    return User.deleteMany({});
  })
  .then(() => {
    console.log('Cleared existing users');
    return User.insertMany(mockUsers);
  })
  .then(() => {
    console.log('Database seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });