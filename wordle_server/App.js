import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Wordle from "./src/routes.js";
import mysql from "mysql2";

const db_conn = mysql.createConnection({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: "wordle",
	port: process.env.DB_PORT || 3306,
}).promise();

db_conn.connect(function(err) {
	if (err) throw err;
	console.log("Connected to DB");
  });

const app = express(); 
app.use(cors({origin: process.env.SITE_URL || "http://localhost:5173"}));
app.use(express.json());
app.set('trust proxy', 1);

Wordle(app, db_conn);

const port = process.env.PORT || 3000; 


app.get('/', (req, res) => {
	res.send("Hello World!")});

app.listen(port);
