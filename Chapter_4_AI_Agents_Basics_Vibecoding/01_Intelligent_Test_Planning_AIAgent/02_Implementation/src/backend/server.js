const http = require('http');
const fs = require('fs');
const path = require('path');
const { getJiraConfig, testJiraConnection, fetchJiraIssue } = require('./jiraService');
const { generateTestPlan } = require('./testPlanGenerator');

// Load .env from parent folders
function loadEnvironment() {
  const candidates = [
    path.resolve(__dirname, '../../../../.env'),
    path.resolve(__dirname, '../../../.env'),
    path.resolve(__dirname, '../../.env'),
    path.resolve(__dirname, '../.env'),
    path.resolve(__dirname, '.env'),
    'C:/AItester/.env'
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const content = fs.readFileSync(candidate, 'utf8');
      content.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=');
          if (idx !== -1) {
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim();
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
      console.log(`Loaded environment from: ${candidate}`);
      break;
    }
  }
}

loadEnvironment();

const PORT = parseInt(process.env.PORT || '3000', 10);
const FRONTEND_DIR = path.resolve(__dirname, '../frontend');

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON in request body'));
      }
    });
    req.on('error', reject);
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // API Routes
  if (pathname === '/api/config' && req.method === 'GET') {
    const config = getJiraConfig();
    return sendJson(res, 200, {
      jiraUrl: config.baseUrl,
      jiraEmail: config.email,
      hasJiraToken: Boolean(config.token),
      hasGroqKey: Boolean(process.env.GROQ_API_KEY),
      aiProvider: process.env.GROQ_API_KEY ? 'Groq (Llama 3.3 70B)' : 'Deterministic Template Engine'
    });
  }

  if (pathname === '/api/test-connection' && req.method === 'GET') {
    try {
      const result = await testJiraConnection();
      return sendJson(res, result.success ? 200 : 400, result);
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  if (pathname === '/api/jira/issue' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      if (!body.issueKey || typeof body.issueKey !== 'string') {
        return sendJson(res, 400, { error: 'Valid issueKey is required (e.g. KAN-1)' });
      }

      const issue = await fetchJiraIssue(body.issueKey);
      return sendJson(res, 200, { issue });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  if (pathname === '/api/testplan/generate' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      let issue = body.issue;

      if (!issue && body.issueKey) {
        issue = await fetchJiraIssue(body.issueKey);
      }

      if (!issue) {
        return sendJson(res, 400, { error: 'Provide issue data or valid issueKey' });
      }

      const testPlan = await generateTestPlan(issue);
      return sendJson(res, 200, {
        issueKey: issue.key,
        summary: issue.summary,
        testPlan
      });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // Static File Serving
  let filePath = path.join(FRONTEND_DIR, pathname === '/' ? 'index.html' : pathname);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(FRONTEND_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
