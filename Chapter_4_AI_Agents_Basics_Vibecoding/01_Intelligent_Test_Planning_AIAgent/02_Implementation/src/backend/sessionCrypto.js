const crypto = require('crypto');

const SECRET = process.env.SESSION_SECRET || 'qa-test-planning-agent-secret-key-2026';
const KEY = crypto.createHash('sha256').update(SECRET).digest(); // 32 bytes for AES-256
const ALGO = 'aes-256-gcm';

function encryptSession(data) {
  try {
    const text = JSON.stringify(data);
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGO, KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    const tag = cipher.getAuthTag();
    // Return iv:tag:encrypted as base64url
    const combined = `${iv.toString('base64')}.${tag.toString('base64')}.${encrypted}`;
    return Buffer.from(combined).toString('base64url');
  } catch (err) {
    console.error('Session encryption failed:', err);
    return null;
  }
}

function decryptSession(token) {
  if (!token) return {};
  try {
    const combined = Buffer.from(token, 'base64url').toString('utf8');
    const [ivB64, tagB64, encrypted] = combined.split('.');
    if (!ivB64 || !tagB64 || !encrypted) return {};

    const iv = Buffer.from(ivB64, 'base64');
    const tag = Buffer.from(tagB64, 'base64');
    const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  } catch (err) {
    return {};
  }
}

function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach(cookie => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    list[name] = decodeURIComponent(value);
  });
  return list;
}

function getSession(req) {
  const cookieHeader = req.headers?.cookie || '';
  const cookies = parseCookies(cookieHeader);
  return decryptSession(cookies.qa_session);
}

function setSessionCookie(res, data) {
  const token = encryptSession(data);
  if (!token) return;
  const isProd = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);
  const cookie = `qa_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=2592000${isProd ? '; Secure' : ''}`;
  res.setHeader('Set-Cookie', cookie);
}

function clearSessionCookie(res) {
  const isProd = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);
  const cookie = `qa_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${isProd ? '; Secure' : ''}`;
  res.setHeader('Set-Cookie', cookie);
}

module.exports = {
  encryptSession,
  decryptSession,
  getSession,
  setSessionCookie,
  clearSessionCookie
};
