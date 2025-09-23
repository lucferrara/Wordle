import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import mysql from 'mysql2';
import 'dotenv/config';

require('dotenv').config({ path: '../.env' });

const db_conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'wordle',
});

db_conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB");
  });

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const filepath = path.join(__dirname, 'words.txt');


fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file: ", err)
        return;
    };

    const words = data.split("\n").map(word => word.trim()).filter(word => word.length == 5);

    const values = words.map(word => [word]);

    const query = 'INSERT INTO words (word) VALUES ?';

    db_conn.query(query, [values], (err, results) => {
        if (err) {
            console.error("Error inserting words: ", err);
            return;
        }

        console.log(`Inserted ${results.affectedRows} words.`);
        
        db_conn.end();
    });
})
