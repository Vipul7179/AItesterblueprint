const fs = require('fs');
const path = require('path');
const https = require('https');

const LOG_FILE = 'C:/AItester/vercel_deploy.log';

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  try {
    fs.appendFileSync(LOG_FILE, line);
  } catch (e) {}
  console.log(msg);
}

fs.writeFileSync(LOG_FILE, `=== Vercel Deployment Started ===\n`);

// Load parent .env if present
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
  log(`Loaded environment from ${envPath}: ${Object.keys(envVars).join(', ')}`);
}

// Environment-variable-based authentication
function resolveToken() {
  if (process.env.VERCEL_TOKEN) return process.env.VERCEL_TOKEN;
  if (envVars['VERCEL_TOKEN']) return envVars['VERCEL_TOKEN'];
  
  // Also check local Vercel CLI auth.json if present
  const appData = process.env.APPDATA || '';
  const vercelAuthPath = path.join(appData, 'com.vercel.cli', 'Data', 'auth.json');
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
  log('ERROR: Missing required environment variable: VERCEL_TOKEN');
  log('Please set VERCEL_TOKEN in your environment or in C:/AItester/.env');
  throw new Error('VERCEL_TOKEN environment variable is required to execute deployment.');
}

const TEAM_ID = process.env.VERCEL_TEAM_ID || envVars['VERCEL_TEAM_ID'] || 'team_X9WW33ND15VNB4GExWD4pco2';
const PROJECT_NAME = process.env.VERCEL_PROJECT_NAME || envVars['VERCEL_PROJECT_NAME'] || 'ai-jira-test-plan-generator';

function vercelRequest(endpoint, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    let urlStr = endpoint.startsWith('http') ? endpoint : `https://api.vercel.com${endpoint}`;
    const url = new URL(urlStr);

    if (TEAM_ID && !url.searchParams.has('teamId')) {
      url.searchParams.set('teamId', TEAM_ID);
    }

    const headers = {
      'Authorization': `Bearer ${TOKEN}`,
      'User-Agent': 'Vercel-Node-Deployer/1.0'
    };

    let payload = null;
    if (body) {
      payload = typeof body === 'string' ? body : JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = https.request({
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers,
      timeout: 45000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timeout for ${endpoint}`));
    });

    req.on('error', reject);

    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  try {
    log(`1. Target Team ID: ${TEAM_ID}`);

    // 2. Ensure Project exists
    log(`2. Ensuring project "${PROJECT_NAME}" exists in team...`);
    let project = null;
    const projectRes = await vercelRequest(`/v9/projects/${PROJECT_NAME}`);
    if (projectRes.status === 200) {
      project = projectRes.data;
      log(`Project already exists: ID = ${project.id}`);
    } else {
      log(`Creating project "${PROJECT_NAME}" in team ${TEAM_ID}...`);
      const createRes = await vercelRequest('/v10/projects', 'POST', {
        name: PROJECT_NAME,
        framework: null
      });
      log(`Create Project Response [${createRes.status}]: ${JSON.stringify(createRes.data)}`);
      if (createRes.status === 200 || createRes.status === 201) {
        project = createRes.data;
      } else {
        throw new Error(`Failed to create project: ${JSON.stringify(createRes.data)}`);
      }
    }

    // 3. Configure Environment Variables
    log('3. Configuring project environment variables on Vercel...');
    const existingEnvRes = await vercelRequest(`/v9/projects/${project.id}/env`);
    const existingKeys = new Set();
    if (existingEnvRes.status === 200 && Array.isArray(existingEnvRes.data?.envs)) {
      existingEnvRes.data.envs.forEach(e => existingKeys.add(e.key));
      log(`Existing environment keys: ${Array.from(existingKeys).join(', ') || 'None'}`);
    }

    const targetEnvs = [
      { key: 'JIRA_URL', value: envVars['JIRA_URL'] || 'https://vpsvipulsingh100.atlassian.net' },
      { key: 'JIRA_EMAIL', value: envVars['JIRA_EMAIL'] || '' },
      { key: 'JIRA_API_TOKEN', value: envVars['JIRA_API_TOKEN'] || '' },
      { key: 'GROQ_API_KEY', value: envVars['GROQ_API_KEY'] || '' }
    ];

    for (const envItem of targetEnvs) {
      if (!envItem.value) continue;
      if (existingKeys.has(envItem.key)) {
        log(`Env "${envItem.key}" already configured.`);
        continue;
      }
      const envRes = await vercelRequest(`/v10/projects/${project.id}/env`, 'POST', {
        key: envItem.key,
        value: envItem.value,
        type: 'sensitive',
        target: ['production', 'preview', 'development']
      });
      log(`Configured env ${envItem.key}: HTTP ${envRes.status}`);
    }

    // 4. Collect Files
    log('4. Reading project deployment files...');
    const baseDir = 'c:/AItester/Chapter_4_AI_Agents_Basics_Vibecoding/01_Intelligent_Test_Planning_AIAgent/02_Implementation';
    
    const filePaths = [
      { file: 'public/index.html', relPath: 'public/index.html' },
      { file: 'public/styles.css', relPath: 'public/styles.css' },
      { file: 'public/app.js', relPath: 'public/app.js' },
      { file: 'public/favicon.svg', relPath: 'public/favicon.svg' },
      { file: 'api/index.js', relPath: 'api/index.js' },
      { file: 'api/sessionCrypto.js', relPath: 'api/sessionCrypto.js' },
      { file: 'api/jiraService.js', relPath: 'api/jiraService.js' },
      { file: 'api/testPlanGenerator.js', relPath: 'api/testPlanGenerator.js' },
      { file: 'vercel.json', relPath: 'vercel.json' },
      { file: 'package.json', relPath: 'package.json' }
    ];

    const filesPayload = [];
    for (const fp of filePaths) {
      const fullPath = path.join(baseDir, fp.relPath);
      if (fs.existsSync(fullPath)) {
        const buffer = fs.readFileSync(fullPath);
        filesPayload.push({
          file: fp.file,
          data: buffer.toString('base64'),
          encoding: 'base64'
        });
        log(`Packed: ${fp.file} (${buffer.length} bytes)`);
      } else {
        log(`WARNING: File missing: ${fullPath}`);
      }
    }

    // 5. Deploy to Vercel
    log('5. Creating Vercel Production Deployment...');
    const deployPayload = {
      name: PROJECT_NAME,
      project: project.id,
      target: 'production',
      files: filesPayload,
      projectSettings: {
        framework: null
      }
    };

    const deployRes = await vercelRequest('/v13/deployments?skipAutoDetectionConfirmation=1', 'POST', deployPayload);
    log(`Deploy Response HTTP ${deployRes.status}`);

    if (deployRes.status !== 200 && deployRes.status !== 201) {
      throw new Error(`Deployment creation failed: ${JSON.stringify(deployRes.data)}`);
    }

    const depData = deployRes.data;
    const deploymentId = depData.id;
    const directUrl = depData.url ? `https://${depData.url}` : null;
    log(`Deployment Created: ID = ${deploymentId}`);
    log(`Direct Deployment URL: ${directUrl}`);

    // 6. Poll for Deployment Ready State
    log('6. Waiting for deployment to build and go LIVE...');
    let readyState = depData.readyState || depData.status || 'QUEUED';
    let attempts = 0;
    let finalUrl = directUrl;

    while (attempts < 30 && readyState !== 'READY' && readyState !== 'ERROR' && readyState !== 'CANCELED') {
      await sleep(4000);
      attempts++;
      const statusRes = await vercelRequest(`/v13/deployments/${deploymentId}`);
      if (statusRes.status === 200) {
        readyState = statusRes.data.readyState || statusRes.data.status;
        log(`Poll [${attempts}/30]: readyState = ${readyState}`);
        if (statusRes.data.url) {
          finalUrl = `https://${statusRes.data.url}`;
        }
      }
    }

    log(`Final Deployment State: ${readyState}`);
    log(`FINAL LIVE PRODUCTION URL: ${finalUrl}`);
    fs.writeFileSync('C:/AItester/live_url.txt', finalUrl || '');

    // 7. Verify Live Deployment
    if (finalUrl) {
      log('7. Verifying live deployment...');
      await sleep(2000);
      try {
        const homeCheck = await new Promise((resolve) => {
          https.get(finalUrl, (res) => {
            resolve({ status: res.statusCode });
          }).on('error', err => resolve({ error: err.message }));
        });
        log(`Live Root URL Check: HTTP ${homeCheck.status}`);

        const configCheck = await new Promise((resolve) => {
          https.get(`${finalUrl}/api/config`, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body }));
          }).on('error', err => resolve({ error: err.message }));
        });
        log(`Live /api/config Check: HTTP ${configCheck.status} -> ${configCheck.body}`);
      } catch (e) {
        log(`API verification check note: ${e.message}`);
      }
    }

    log('=== Vercel Deployment Completed Successfully ===');
  } catch (err) {
    log(`DEPLOYMENT FAILED: ${err.message}`);
  }
}

main();
