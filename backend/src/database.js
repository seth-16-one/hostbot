const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "db.json");

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8").replace(/^\uFEFF/, ""));
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  return db;
}

function updateDb(mutator) {
  const db = readDb();
  const result = mutator(db);
  writeDb(db);
  return result;
}

module.exports = { readDb, updateDb, writeDb };
