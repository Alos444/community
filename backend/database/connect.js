const { Pool } = require('pg');
require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

console.log('Loaded DB_URL from .env:', process.env.DB_URL);

if (!process.env.DB_URL) {
    throw new Error('DB_URL is undefined. Ensure .env is configured properly.');
}

const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to the database successfully!');
    }
});

module.exports = db;