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

function get(path) {
  return new Promise((resolve) => {
    https.get(`https://api.vercel.com${path}`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'User-Agent': 'Vercel-Inspector'
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
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function run() {
  const user = await get('/v2/user');
  const teams = await get('/v2/teams');
  const projects = await get('/v9/projects');
  
  fs.writeFileSync('C:/AItester/vercel_account_info.json', JSON.stringify({
    user,
    teams,
    projects
  }, null, 2));
}

run();
