import express from 'express';
import cors from 'cors';
import session from 'express-session';
import 'dotenv/config';

const app = express(); 

const port = process.env.PORT || 3000; 

app.use(cors({origin: process.env.NETLIFY_URL || "http://localhost:5173"}));

app.get('/', (req, res) => {
	res.send("Hello World!")});

app.listen(port);
