const fs = require('fs');
const https = require('https');

const urls = [
  'https://intelligent-test-planning-ai-agent.vercel.app',
  'https://intelligent-test-planning-ai-agent.vercel.app/api/config',
  'https://intelligent-test-planning-ai-agent.vercel.app/api/test-connection',
  'https://intelligent-test-planning-ai-agent-vipul-singh-qa.vercel.app',
  'https://intelligent-test-planning-ai-agent-vipul-singh-qa.vercel.app/api/config'
];

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          body: body.length > 500 ? body.slice(0, 500) + '...' : body
        });
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function run() {
  const results = [];
  for (const url of urls) {
    const res = await fetchUrl(url);
    results.push(res);
  }
  fs.writeFileSync('C:/AItester/live_verification.json', JSON.stringify(results, null, 2));
}

run();
