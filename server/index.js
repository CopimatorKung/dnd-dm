require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET =
  process.env.JWT_SECRET || "dnd-dm-secret-key-change-in-production";

// ---- SUPABASE ----
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // service role — bypass RLS
);

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
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password)
    return res.status(400).json({ error: "กรุณาใส่ username และ password" });
  if (username.length < 3)
    return res.status(400).json({ error: "Username ต้องมีอย่างน้อย 3 ตัวอักษร" });
  if (password.length < 4)
    return res.status(400).json({ error: "Password ต้องมีอย่างน้อย 4 ตัวอักษร" });

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .ilike("username", username)
    .maybeSingle();

  if (existing) return res.status(409).json({ error: "Username นี้ถูกใช้ไปแล้ว" });

  const id = Date.now();
  const passwordHash = bcrypt.hashSync(password, 10);

  const { error } = await supabase
    .from("users")
    .insert({ id, username, password_hash: passwordHash, created_at: id });

  if (error) return res.status(500).json({ error: error.message });

  const token = jwt.sign({ userId: id, username }, JWT_SECRET, { expiresIn: "30d" });
  res.json({ token, userId: id, username });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password)
    return res.status(400).json({ error: "กรุณาใส่ username และ password" });

  const { data: user } = await supabase
    .from("users")
    .select("id, username, password_hash")
    .ilike("username", username)
    .maybeSingle();

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
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
app.get("/api/saves", authMiddleware, async (req, res) => {
  const { data, error } = await supabase
    .from("saves")
    .select("id, name, char_name, saved_at")
    .eq("user_id", req.user.userId)
    .order("saved_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(
    data.map((s) => ({
      id: s.id,
      name: s.name,
      charName: s.char_name,
      savedAt: s.saved_at,
    })),
  );
});

app.post("/api/saves", authMiddleware, async (req, res) => {
  const { id, name, charName, savedAt, data } = req.body;
  if (!id) return res.status(400).json({ error: "id required" });

  const { error } = await supabase.from("saves").upsert(
    {
      id,
      user_id: req.user.userId,
      name,
      char_name: charName,
      saved_at: savedAt,
      data,
    },
    { onConflict: "id" },
  );

  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

app.get("/api/saves/:id", authMiddleware, async (req, res) => {
  const { data, error } = await supabase
    .from("saves")
    .select("data")
    .eq("id", req.params.id)
    .eq("user_id", req.user.userId)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "Save not found" });
  res.json(data.data);
});

app.delete("/api/saves/:id", authMiddleware, async (req, res) => {
  const { error } = await supabase
    .from("saves")
    .delete()
    .eq("id", req.params.id)
    .eq("user_id", req.user.userId);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

// ---- GEMINI PROXY (protected) ----
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

app.post("/api/gemini", authMiddleware, async (req, res) => {
  const { systemPrompt, history } = req.body || {};
  if (!systemPrompt || !history)
    return res.status(400).json({ error: "systemPrompt and history required" });

  const apiKey = process.env.GEMINI_KEY;
  if (!apiKey) return res.status(500).json({ error: "GEMINI_KEY not configured" });

  const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: history,
      generationConfig: {
        maxOutputTokens: 1200,
        thinkingConfig: { thinkingBudget: 0 },
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" },
      ],
    }),
  });

  if (!geminiRes.ok) {
    const err = await geminiRes.text();
    return res.status(geminiRes.status).json({ error: err });
  }

  const data = await geminiRes.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const text = parts
    .filter((p) => !p.thought && p.text)
    .map((p) => p.text)
    .join("");

  res.json({ text });
});

app.listen(PORT, () => {
  console.log(`🎲 DnD DM Server running on http://localhost:${PORT}`);
});
