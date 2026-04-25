const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

async function initDb() {
  const dbName = process.env.DB_NAME || 'coffee_shop_db';
  
  // Connect to the default 'postgres' database to create the new database
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: 'postgres', 
  });

  try {
    console.log('Connecting to PostgreSQL server...');
    await client.connect();

    console.log(`Checking if database ${dbName} exists...`);
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
    
    if (res.rowCount === 0) {
      console.log(`Creating database ${dbName}...`);
      await client.query(`CREATE DATABASE "${dbName}";`);
      console.log(`Database ${dbName} created successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (err) {
    console.error('Database initialization failed. Please ensure PostgreSQL is running on', process.env.DB_HOST, 'port', process.env.DB_PORT);
    console.error('Error details:', err.message);
  } finally {
    await client.end();
    console.log('Setup finished.');
  }
}

initDb();
