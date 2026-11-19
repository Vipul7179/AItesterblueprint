const fs = require('fs');
const https = require('https');

// Load environment from .env if present
const envPath = 'C:/AItester/.env';
const envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        envVars[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
      }
    }
  });
}

// Environment-variable-based authentication
function resolveToken() {
  if (process.env.VERCEL_TOKEN) return process.env.VERCEL_TOKEN;
  if (envVars['VERCEL_TOKEN']) return envVars['VERCEL_TOKEN'];
  const appData = process.env.APPDATA || '';
  const vercelAuthPath = require('path').join(appData, 'com.vercel.cli', 'Data', 'auth.json');
  if (fs.existsSync(vercelAuthPath)) {
    try {
      const authData = JSON.parse(fs.readFileSync(vercelAuthPath, 'utf8'));
      if (authData.token) return authData.token;
    } catch (e) {}
  }
  return null;
}

const TOKEN = resolveToken();
if (!TOKEN) {
  console.error('ERROR: Missing required environment variable: VERCEL_TOKEN');
  console.error('Please set VERCEL_TOKEN in your environment or in C:/AItester/.env');
  process.exit(1);
}

function api(path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    const url = new URL(path, 'https://api.vercel.com');
    const headers = {
      'Authorization': `Bearer ${TOKEN}`,
      'User-Agent': 'Vercel-Northstar-Test'
    };
    let payload = null;
    if (body) {
      payload = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(payload);
    }
    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', err => resolve({ error: err.message }));
    if (payload) req.write(payload);
    req.end();
  });
}

async function run() {
  const log = {};

  // Try creating a team
  log.createTeamV1 = await api('/v1/teams', 'POST', { slug: 'vipul-singh-qa', name: 'Vipul Singh QA' });
  
  // Try checking v1 teams
  log.getTeamsV1 = await api('/v1/teams');

  // Try direct v13 deployment without project
  log.directDeploy = await api('/v13/deployments', 'POST', {
    name: 'test-deploy',
    files: [{ file: 'index.html', data: '<h1>Hello World</h1>' }]
  });

  fs.writeFileSync('C:/AItester/northstar_test.json', JSON.stringify(log, null, 2));
}

run();
