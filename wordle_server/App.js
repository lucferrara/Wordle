// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mysql from 'mysql2/promise';
import Wordle from './src/routes.js';

const app = express();

// --- DB POOL (not a single connection) ---
export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'wordle_app', 
  password: process.env.DB_PASSWORD || '',
  database: 'wordle',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10_000,               // 10s ping to keep NAT/timeouts happy 
});

// Optional: quick health ping at startup
await pool.query('SELECT 1');

// --- Express setup ---
const allowedOrigin = process.env.SITE_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));      
app.use(express.json());

app.set('trust proxy', 1);

Wordle(app, pool);

// Simple health endpoint for systemd/nginx checks
app.get('/healthz', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.status(200).send('ok'); }
  catch { res.status(500).send('db down'); }
});

app.get('/', (_req, res) => res.send('Hello World!'));

const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, () => {
  console.log(`API listening on :${port}`);
});

// --- Robust shutdown (systemd sends SIGTERM on stop/restart) ---
async function shutdown(signal) {
  console.log(`\n${signal} received. Closing server…`);
  try {
    await new Promise((r) => server.close(r)); // stop accepting new requests
    await pool.end();                          // close DB pool cleanly
  } catch (e) {
    console.error('Error during shutdown:', e);
  } finally {
    process.exit(0);
  }
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

// Don’t let the process die silently on transient errors
process.on('unhandledRejection', (err) => console.error('unhandledRejection', err));
process.on('uncaughtException', (err) => console.error('uncaughtException', err));

