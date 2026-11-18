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
const TOKEN = process.env.VERCEL_TOKEN || envVars['VERCEL_TOKEN'];
if (!TOKEN) {
  console.error('ERROR: Missing required environment variable: VERCEL_TOKEN');
  console.error('Please set VERCEL_TOKEN in your environment or in C:/AItester/.env');
  process.exit(1);
}

const TEAM_ID = process.env.VERCEL_TEAM_ID || envVars['VERCEL_TEAM_ID'] || 'team_X9WW33ND15VNB4GExWD4pco2';
const PROJECT_NAME = process.env.VERCEL_PROJECT_NAME || 'intelligent-test-planning-ai-agent';

function patchProject(body) {
  return new Promise((resolve) => {
    const payload = JSON.stringify(body);
    const req = https.request({
      hostname: 'api.vercel.com',
      path: `/v9/projects/${PROJECT_NAME}?teamId=${TEAM_ID}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'Vercel-Configurator'
      }
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
    req.write(payload);
    req.end();
  });
}

async function run() {
  // Disable SSO / Vercel Auth Protection so the site is publicly accessible to everyone
  const res = await patchProject({
    ssoProtection: null,
    passwordProtection: null
  });

  // Check alias / production domain
  const aliasCheck = await new Promise((resolve) => {
    https.get(`https://api.vercel.com/v9/projects/${PROJECT_NAME}?teamId=${TEAM_ID}`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    }, (r) => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => resolve(JSON.parse(d)));
    });
  });

  fs.writeFileSync('C:/AItester/protection_update.json', JSON.stringify({
    patchResponse: res,
    projectInfo: {
      id: aliasCheck.id,
      name: aliasCheck.name,
      ssoProtection: aliasCheck.ssoProtection,
      targets: aliasCheck.targets,
      alias: aliasCheck.alias
    }
  }, null, 2));

  // Also check if public access returns HTTP 200 now!
  const liveUrl = 'https://intelligent-test-planning-ai-agent-i77xuwnhc-vipul-singh-qa.vercel.app';
  const testFetch = await new Promise((resolve) => {
    https.get(liveUrl, (r) => {
      resolve({ status: r.statusCode, headers: r.headers });
    }).on('error', err => resolve({ error: err.message }));
  });

  fs.writeFileSync('C:/AItester/public_test.json', JSON.stringify(testFetch, null, 2));
}

run();
