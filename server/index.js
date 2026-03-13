const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET =
  process.env.JWT_SECRET || "dnd-dm-secret-key-change-in-production";

// ---- FILE-BASED STORAGE ----
const DB_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DB_DIR, "users.json");
const SAVES_FILE = path.join(DB_DIR, "saves.json");

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
if (!fs.existsSync(SAVES_FILE)) fs.writeFileSync(SAVES_FILE, "[]");

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}
function writeUsers(data) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}
function readSaves() {
  return JSON.parse(fs.readFileSync(SAVES_FILE, "utf8"));
}
function writeSaves(data) {
  fs.writeFileSync(SAVES_FILE, JSON.stringify(data, null, 2));
}

// ---- MIDDLEWARE ----
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ---- AUTH ROUTES ----
app.post("/api/register", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password)
    return res.status(400).json({ error: "กรุณาใส่ username และ password" });
  if (username.length < 3)
    return res
      .status(400)
      .json({ error: "Username ต้องมีอย่างน้อย 3 ตัวอักษร" });
  if (password.length < 4)
    return res
      .status(400)
      .json({ error: "Password ต้องมีอย่างน้อย 4 ตัวอักษร" });

  const users = readUsers();
  if (users.find((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return res.status(409).json({ error: "Username นี้ถูกใช้ไปแล้ว" });
  }

  const id = Date.now();
  const passwordHash = bcrypt.hashSync(password, 10);
  users.push({ id, username, passwordHash, createdAt: id });
  writeUsers(users);

  const token = jwt.sign({ userId: id, username }, JWT_SECRET, {
    expiresIn: "30d",
  });
  res.json({ token, userId: id, username });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password)
    return res.status(400).json({ error: "กรุณาใส่ username และ password" });

  const users = readUsers();
  const user = users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase(),
  );
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: "Username หรือ Password ไม่ถูกต้อง" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "30d" },
  );
  res.json({ token, userId: user.id, username: user.username });
});

// ---- SAVE ROUTES (protected) ----
app.get("/api/saves", authMiddleware, (req, res) => {
  const saves = readSaves().filter((s) => s.userId === req.user.userId);
  res.json(
    saves.map(({ id, name, charName, savedAt }) => ({
      id,
      name,
      charName,
      savedAt,
    })),
  );
});

app.post("/api/saves", authMiddleware, (req, res) => {
  const { id, name, charName, savedAt, data } = req.body;
  if (!id) return res.status(400).json({ error: "id required" });

  const saves = readSaves();
  const idx = saves.findIndex(
    (s) => s.id === id && s.userId === req.user.userId,
  );
  const entry = { id, userId: req.user.userId, name, charName, savedAt, data };

  if (idx >= 0) saves[idx] = entry;
  else saves.push(entry);

  writeSaves(saves);
  res.json({ ok: true });
});

app.get("/api/saves/:id", authMiddleware, (req, res) => {
  const save = readSaves().find(
    (s) => s.id === req.params.id && s.userId === req.user.userId,
  );
  if (!save) return res.status(404).json({ error: "Save not found" });
  res.json(save.data);
});

app.delete("/api/saves/:id", authMiddleware, (req, res) => {
  const saves = readSaves().filter(
    (s) => !(s.id === req.params.id && s.userId === req.user.userId),
  );
  writeSaves(saves);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`🎲 DnD DM Server running on http://localhost:${PORT}`);
});
