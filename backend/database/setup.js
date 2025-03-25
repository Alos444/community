const fs = require('fs');
const path = require('path');
const db = require('./connect');

const sql = fs.readFileSync(path.join(__dirname, 'first.sql')).toString();

db.query(sql)
    .then(() => {
        console.log('Database setup complete!');
        db.end();
    })
    .catch((error) => {
        console.error('Error setting up database:', error.message);
        db.end();
    });
