const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { DB_FILE } = require('./config');

const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(DB_FILE);
db.pragma('foreign_keys = ON');

// Migração simples (idempotente)
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS movies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  platform TEXT NOT NULL,
  imageLink TEXT,
  price REAL NOT NULL DEFAULT 0,
  description TEXT,
  availableInStock INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT
);
`);

module.exports = db;
