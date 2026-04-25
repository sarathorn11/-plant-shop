const { sequelize, Product } = require('../models');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

async function seedData() {
  try {
    await sequelize.authenticate();
    console.log('Connected to database to seed 20 fresh products with real photos...');

    await Product.destroy({ where: {} });

    // Helper to generate consistent Pexels URLs
    const getPexelsUrl = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`;

    const products = [
      { name: 'Espresso', price: 2.50, category: 'Hot Coffee', stock: 100, image: getPexelsUrl('312418') },
      { name: 'Double Espresso', price: 3.00, category: 'Hot Coffee', stock: 100, image: getPexelsUrl('437716') },
      { name: 'Macchiato', price: 3.25, category: 'Hot Coffee', stock: 100, image: getPexelsUrl('685527') },
      { name: 'Cortado', price: 3.50, category: 'Hot Coffee', stock: 100, image: getPexelsUrl('1193335') },
      { name: 'Flat White', price: 3.75, category: 'Hot Coffee', stock: 100, image: getPexelsUrl('374147') },
      { name: 'Cappuccino', price: 3.75, category: 'Hot Coffee', stock: 100, image: getPexelsUrl('302899') },
      { name: 'Latte', price: 4.00, category: 'Hot Coffee', stock: 100, image: getPexelsUrl('894695') },
      { name: 'Vanilla Latte', price: 4.50, category: 'Hot Coffee', stock: 100, image: getPexelsUrl('2396220') },
      { name: 'Caramel Macchiato', price: 4.75, category: 'Hot Coffee', stock: 100, image: getPexelsUrl('302896') },
      { name: 'Americano', price: 3.00, category: 'Hot Coffee', stock: 100, image: getPexelsUrl('1695052') },
      { name: 'Mocha', price: 4.50, category: 'Hot Coffee', stock: 80, image: getPexelsUrl('994883') },
      { name: 'Hot Chocolate', price: 3.50, category: 'Hot Drink', stock: 50, image: getPexelsUrl('851555') },
      
      { name: 'Cold Brew', price: 4.00, category: 'Cold Coffee', stock: 100, image: getPexelsUrl('1207918') },
      { name: 'Iced Latte', price: 4.50, category: 'Cold Coffee', stock: 100, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&fit=crop' },
      { name: 'Iced Americano', price: 3.50, category: 'Cold Coffee', stock: 100, image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&fit=crop' },
      
      { name: 'Matcha Latte', price: 4.75, category: 'Tea', stock: 60, image: getPexelsUrl('3727184') },
      { name: 'Chai Tea Latte', price: 4.25, category: 'Tea', stock: 60, image: getPexelsUrl('1417945') },
      
      { name: 'Butter Croissant', price: 3.25, category: 'Pastries', stock: 30, image: getPexelsUrl('376464') },
      { name: 'Chocolate Croissant', price: 3.75, category: 'Pastries', stock: 25, image: getPexelsUrl('3323682') },
      { name: 'Blueberry Muffin', price: 2.75, category: 'Pastries', stock: 25, image: getPexelsUrl('1055272') }
    ];

    for (const item of products) {
      await Product.create(item);
      console.log(`Added product: ${item.name}`);
    }

    console.log('20 new sample items seeded successfully with real photos!');
  } catch (err) {
    console.error('Data seeding failed:', err);
  } finally {
    process.exit(0);
  }
}

seedData();
