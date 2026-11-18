const { getJiraConfig, testJiraConnection, fetchJiraIssue } = require('./jiraService');
const { generateTestPlan } = require('./testPlanGenerator');

async function getParsedBody(req) {
  if (req.body) {
    if (typeof req.body === 'object') return req.body;
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function sendJson(res, statusCode, data) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  // Route 1: /api/config
  if (pathname === '/api/config' || pathname.endsWith('/config')) {
    const config = getJiraConfig();
    return sendJson(res, 200, {
      jiraUrl: config.baseUrl,
      hasJiraToken: Boolean(config.token),
      hasGroqKey: Boolean(process.env.GROQ_API_KEY),
      aiProvider: process.env.GROQ_API_KEY ? 'Groq (Llama 3.3 70B)' : 'Deterministic Template Engine'
    });
  }

  // Route 2: /api/test-connection
  if (pathname === '/api/test-connection' || pathname.endsWith('/test-connection')) {
    try {
      const result = await testJiraConnection();
      return sendJson(res, result.success ? 200 : 400, result);
    } catch (err) {
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  // Route 3: /api/jira/issue
  if (pathname === '/api/jira/issue' || pathname.endsWith('/issue')) {
    try {
      const body = await getParsedBody(req);
      if (!body.issueKey || typeof body.issueKey !== 'string') {
        return sendJson(res, 400, { error: 'Valid issueKey is required (e.g. KAN-1)' });
      }

      const issue = await fetchJiraIssue(body.issueKey);
      return sendJson(res, 200, { issue });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // Route 4: /api/testplan/generate
  if (pathname === '/api/testplan/generate' || pathname.endsWith('/generate')) {
    try {
      const body = await getParsedBody(req);
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

  // Fallback
  return sendJson(res, 404, { error: 'Not Found', path: pathname });
};
