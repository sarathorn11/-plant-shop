const { sequelize, User } = require('../models');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Connected to database for seeding...');

    const users = [
      { username: 'admin', password: 'admin123', role: 'Admin' },
      { username: 'cashier', password: 'cashier123', role: 'Cashier' },
      { username: 'barista', password: 'barista123', role: 'Barista' }
    ];
    
    for (const u of users) {
      const exists = await User.findOne({ where: { username: u.username } });
      if (!exists) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(u.password, salt);
        await User.create({ username: u.username, passwordHash: hash, role: u.role });
        console.log(`Created user: ${u.username}`);
      } else {
        console.log(`User ${u.username} already exists.`);
      }
    }

  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    process.exit(0);
  }
}

seed();
