const { getJiraConfig, testJiraConnection, fetchJiraIssue } = require('./jiraService');
const { generateTestPlan, testLlmConnection } = require('./testPlanGenerator');
const { getSession, setSessionCookie, clearSessionCookie } = require('./sessionCrypto');

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

function isValidHttpUrl(str) {
  if (!str || typeof str !== 'string') return false;
  const trimmed = str.trim();
  try {
    const parsed = new URL(trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && 
      Boolean(parsed.hostname) && 
      (parsed.hostname.includes('.') || parsed.hostname === 'localhost');
  } catch {
    return false;
  }
}

function isValidEmailAddress(str) {
  if (!str || typeof str !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
}

function sendJson(req, res, statusCode, data) {
  const origin = req.headers?.origin || '*';
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    return res.status(statusCode).json(data);
  }
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

module.exports = async (req, res) => {
  const origin = req.headers?.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;
  const session = getSession(req);

  // 1. GET /api/config
  if (pathname === '/api/config' || pathname.endsWith('/config')) {
    const jiraConfig = getJiraConfig(session.jira || {});
    const hasCustomJira = Boolean(session.jira);
    const hasCustomJiraToken = Boolean(session.jira?.token);
    const hasSystemJiraToken = Boolean(process.env.JIRA_API_TOKEN);
    const isJiraConnected = Boolean(jiraConfig.isConfigured);

    const llmProvider = session.llm?.provider || (process.env.GROQ_API_KEY ? 'groq' : 'deterministic');
    const groqModel = session.llm?.groqModel || 'llama-3.3-70b-versatile';
    const hasCustomGroqKey = Boolean(session.llm?.groqApiKey);
    const hasSystemGroqKey = Boolean(process.env.GROQ_API_KEY);
    const hasGroqKey = hasCustomGroqKey || hasSystemGroqKey;
    const ollamaUrl = session.llm?.ollamaUrl || 'http://localhost:11434';
    const ollamaModel = session.llm?.ollamaModel || 'llama3';

    let activeLabel = 'Deterministic Template Engine';
    if (llmProvider === 'ollama') {
      activeLabel = `Ollama (${ollamaModel})`;
    } else if (hasGroqKey) {
      activeLabel = `Groq (${groqModel})`;
    }

    return sendJson(req, res, 200, {
      jira: {
        connected: isJiraConnected,
        status: isJiraConnected ? 'Credentials Configured' : 'Not Configured',
        hasToken: isJiraConnected,
        isCustom: hasCustomJira,
        baseUrl: session.jira?.baseUrl || '',
        email: session.jira?.email || '',
        token: '' // Never expose raw token
      },
      llm: {
        provider: llmProvider,
        groqModel: groqModel,
        model: llmProvider === 'ollama' ? ollamaModel : groqModel,
        connected: llmProvider === 'groq' ? hasGroqKey : true,
        hasGroqKey: hasGroqKey,
        status: (llmProvider === 'groq' ? hasGroqKey : true) ? 'Credentials Configured' : 'Not Configured',
        isCustom: Boolean(session.llm),
        ollamaUrl: session.llm?.ollamaUrl || 'http://localhost:11434',
        ollamaModel: session.llm?.ollamaModel || 'llama3',
        groqApiKey: '' // Never expose raw API key
      },
      isCustomSession: Boolean(session.jira || session.llm),
      activeAiProviderLabel: activeLabel,
      hasJiraToken: isJiraConnected,
      hasGroqKey: hasGroqKey,
      aiProvider: activeLabel
    });
  }

  // 2. POST /api/settings/jira
  if (pathname === '/api/settings/jira' || pathname.endsWith('/settings/jira')) {
    try {
      const body = await getParsedBody(req);
      const currentJira = session.jira || {};
      const existingToken = currentJira.token || process.env.JIRA_API_TOKEN || '';

      const rawUrl = (body.baseUrl || body.url || '').trim();
      const rawEmail = (body.email !== undefined ? body.email : '').trim();
      const rawToken = (body.token || '').trim();

      const fieldErrors = {};

      // 1. Workspace URL validation
      if (!rawUrl) {
        fieldErrors.url = 'Jira Workspace URL is required.';
      } else if (!isValidHttpUrl(rawUrl)) {
        fieldErrors.url = 'Please enter a valid Jira Cloud URL (e.g. https://your-workspace.atlassian.net).';
      }

      // 2. Account Email validation
      if (!rawEmail) {
        fieldErrors.email = 'Jira Account Email is required.';
      } else if (!isValidEmailAddress(rawEmail)) {
        fieldErrors.email = 'Please enter a valid email address (e.g. user@company.com).';
      }

      // 3. API Token validation (Required during initial configuration, or can retain existing token)
      if (!rawToken && !existingToken) {
        fieldErrors.token = 'Jira API Token is required for initial configuration.';
      }

      // If any validation error, reject with HTTP 400 and detail
      if (Object.keys(fieldErrors).length > 0) {
        return sendJson(req, res, 400, {
          success: false,
          error: Object.values(fieldErrors)[0],
          fieldErrors
        });
      }

      // Format clean URL (with https://) and final token
      const cleanUrl = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') 
        ? rawUrl.replace(/\/+$/, '') 
        : `https://${rawUrl.replace(/\/+$/, '')}`;
      
      // Never overwrite an existing token with an empty string
      const finalToken = rawToken || existingToken;

      session.jira = {
        baseUrl: cleanUrl,
        email: rawEmail,
        token: finalToken
      };

      setSessionCookie(res, session);
      return sendJson(req, res, 200, {
        success: true,
        message: 'Jira settings saved securely in your session cookie.',
        jira: {
          url: cleanUrl,
          email: rawEmail,
          hasToken: Boolean(finalToken),
          isCustom: true
        }
      });
    } catch (err) {
      return sendJson(req, res, 400, { success: false, error: err.message });
    }
  }

  // 3. POST /api/settings/llm
  if (pathname === '/api/settings/llm' || pathname.endsWith('/settings/llm')) {
    try {
      const body = await getParsedBody(req);
      const currentLlm = session.llm || {};
      const finalGroqKey = (body.groqApiKey && body.groqApiKey.trim()) 
        ? body.groqApiKey.trim() 
        : (currentLlm.groqApiKey || '');

      session.llm = {
        provider: body.provider || currentLlm.provider || 'groq',
        groqApiKey: finalGroqKey,
        groqModel: body.groqModel || currentLlm.groqModel || 'llama-3.3-70b-versatile',
        ollamaUrl: body.ollamaUrl || currentLlm.ollamaUrl || 'http://localhost:11434',
        ollamaModel: body.ollamaModel || currentLlm.ollamaModel || 'llama3'
      };

      setSessionCookie(res, session);
      return sendJson(req, res, 200, {
        success: true,
        message: 'LLM configuration saved securely in your session cookie.',
        llm: {
          provider: session.llm.provider,
          groqModel: session.llm.groqModel,
          hasGroqKey: Boolean(session.llm.groqApiKey),
          ollamaUrl: session.llm.ollamaUrl,
          ollamaModel: session.llm.ollamaModel,
          isCustom: true
        }
      });
    } catch (err) {
      return sendJson(req, res, 400, { error: err.message });
    }
  }

  // 4. POST /api/settings/reset
  if (pathname === '/api/settings/reset' || pathname.endsWith('/settings/reset')) {
    clearSessionCookie(res);
    return sendJson(req, res, 200, {
      success: true,
      message: 'Custom settings cleared. Reverted to system defaults.'
    });
  }

  // 5. Test Jira Connection (GET/POST /api/test-connection or /api/test-connection/jira)
  if (pathname === '/api/test-connection' || pathname === '/api/test-connection/jira' || pathname.endsWith('/test-connection') || pathname.endsWith('/test-connection/jira')) {
    try {
      let customCreds = null;
      if (req.method === 'POST') {
        const body = await getParsedBody(req);
        const currentJira = session.jira || {};
        const existingToken = currentJira.token || process.env.JIRA_API_TOKEN || '';

        const urlInput = (body.baseUrl !== undefined ? body.baseUrl : (body.url !== undefined ? body.url : (currentJira.baseUrl || process.env.JIRA_BASE_URL || process.env.JIRA_URL || ''))).trim();
        const emailInput = (body.email !== undefined ? body.email : (currentJira.email || process.env.JIRA_USER_EMAIL || process.env.JIRA_EMAIL || '')).trim();
        const tokenInput = (body.token && body.token.trim()) ? body.token.trim() : existingToken;

        const fieldErrors = {};
        if (!urlInput) {
          fieldErrors.url = 'Jira Workspace URL is required.';
        } else if (!isValidHttpUrl(urlInput)) {
          fieldErrors.url = 'Please enter a valid Jira Cloud URL.';
        }

        if (!emailInput) {
          fieldErrors.email = 'Jira Account Email is required.';
        } else if (!isValidEmailAddress(emailInput)) {
          fieldErrors.email = 'Please enter a valid email address.';
        }

        if (!tokenInput) {
          fieldErrors.token = 'Jira API Token is required.';
        }

        if (Object.keys(fieldErrors).length > 0) {
          return sendJson(req, res, 400, {
            success: false,
            message: Object.values(fieldErrors)[0],
            fieldErrors
          });
        }

        const cleanUrl = urlInput.startsWith('http://') || urlInput.startsWith('https://') 
          ? urlInput.replace(/\/+$/, '') 
          : `https://${urlInput.replace(/\/+$/, '')}`;

        customCreds = {
          baseUrl: cleanUrl,
          email: emailInput,
          token: tokenInput
        };
      } else {
        if (session.jira) {
          customCreds = session.jira;
        }
      }

      const result = await testJiraConnection(customCreds);
      return sendJson(req, res, result.success ? 200 : 400, result);
    } catch (err) {
      return sendJson(req, res, 500, { success: false, message: err.message });
    }
  }

  // 6. POST /api/test-connection/llm
  if (pathname === '/api/test-connection/llm' || pathname.endsWith('/test-connection/llm')) {
    try {
      const body = await getParsedBody(req);
      const testConfig = {
        provider: body.provider || session.llm?.provider || 'groq',
        apiKey: body.groqApiKey || session.llm?.groqApiKey || process.env.GROQ_API_KEY,
        model: body.groqModel || session.llm?.groqModel || 'llama-3.3-70b-versatile',
        url: body.ollamaUrl || session.llm?.ollamaUrl || 'http://localhost:11434',
        ollamaModel: body.ollamaModel || session.llm?.ollamaModel || 'llama3'
      };

      const result = await testLlmConnection(testConfig);
      return sendJson(req, res, result.success ? 200 : 400, result);
    } catch (err) {
      return sendJson(req, res, 500, { success: false, message: err.message });
    }
  }

  // 7. POST /api/jira/issue
  if (pathname === '/api/jira/issue' || pathname.endsWith('/issue')) {
    try {
      const body = await getParsedBody(req);
      if (!body.issueKey || typeof body.issueKey !== 'string') {
        return sendJson(req, res, 400, { error: 'Valid issueKey is required (e.g. KAN-1)' });
      }

      const issue = await fetchJiraIssue(body.issueKey, session.jira);
      return sendJson(req, res, 200, { issue });
    } catch (err) {
      return sendJson(req, res, 400, { error: err.message });
    }
  }

  // 8. POST /api/testplan/generate
  if (pathname === '/api/testplan/generate' || pathname.endsWith('/generate')) {
    try {
      const body = await getParsedBody(req);
      let issue = body.issue;

      if (!issue && body.issueKey) {
        issue = await fetchJiraIssue(body.issueKey, session.jira);
      }

      if (!issue) {
        return sendJson(req, res, 400, { error: 'Provide issue data or valid issueKey' });
      }

      const testPlan = await generateTestPlan(issue, session.llm);
      return sendJson(req, res, 200, {
        issueKey: issue.key,
        summary: issue.summary,
        testPlan
      });
    } catch (err) {
      return sendJson(req, res, 500, { error: err.message });
    }
  }

  // Fallback
  return sendJson(req, res, 404, { error: 'Not Found', path: pathname });
};
