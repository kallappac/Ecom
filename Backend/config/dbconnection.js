// db.js
require("dotenv").config(); // Load environment variables from .env file

const { Pool } = require("pg");

// Create a new instance of the Pool class using environment variables
const pool = new Pool({
  user: process.env.DB_USER, // Access the DB_USER from .env
  host: process.env.DB_HOST, // Access the DB_HOST from .env
  database: process.env.DB_NAME, // Access the DB_NAME from .env
  password: process.env.DB_PASSWORD, // Access the DB_PASSWORD from .env
  port: process.env.DB_PORT, // Access the DB_PORT from .env
});

// Export the pool instance to be used in other files
module.exports = pool;
