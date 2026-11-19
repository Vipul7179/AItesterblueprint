function getJiraConfig(overrides = {}) {
  const url = overrides.baseUrl || overrides.jiraUrl || process.env.JIRA_BASE_URL || process.env.JIRA_URL || 'https://vpsvipulsingh100.atlassian.net';
  const email = overrides.email !== undefined ? overrides.email : (overrides.jiraEmail || process.env.JIRA_USER_EMAIL || process.env.JIRA_EMAIL || '');
  const token = overrides.token !== undefined ? overrides.token : (overrides.jiraToken || process.env.JIRA_API_TOKEN || '');
  return {
    baseUrl: (url || '').replace(/\/+$/, ''),
    email: (email || '').trim(),
    token: (token || '').trim(),
    isConfigured: Boolean((email || '').trim() && (token || '').trim()),
    source: (overrides.token || overrides.email) ? 'session' : 'system'
  };
}

function extractTextFromAdf(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (node.type === 'text') return node.text || '';
  if (Array.isArray(node.content)) {
    return node.content.map(extractTextFromAdf).join(node.type === 'paragraph' ? '\n' : ' ');
  }
  return '';
}

async function testJiraConnection(customConfig = null) {
  const config = getJiraConfig(customConfig || {});
  if (!config.isConfigured) {
    return { success: false, message: 'Jira email or API token not configured.' };
  }

  const authHeader = 'Basic ' + Buffer.from(`${config.email}:${config.token}`).toString('base64');
  try {
    const res = await fetch(`${config.baseUrl}/rest/api/3/myself`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json'
      }
    });

    if (res.ok) {
      return {
        success: true,
        status: 'Connected',
        message: 'Successfully connected to Jira Cloud REST v3. Workspace is authorized and healthy.'
      };
    } else {
      let detail = `Jira API returned HTTP ${res.status}: ${res.statusText}.`;
      if (res.status === 401) {
        detail = 'Authentication failed (401 Unauthorized). Please check your email and API token.';
      } else if (res.status === 403) {
        detail = 'Access forbidden (403 Forbidden). Ensure your Jira account has API access permissions.';
      } else if (res.status === 404) {
        detail = 'Workspace endpoint not found (404 Not Found). Verify your Jira Workspace URL.';
      }
      return {
        success: false,
        status: res.status,
        message: detail
      };
    }
  } catch (error) {
    let msg = error.message;
    if (msg.includes('ENOTFOUND') || msg.includes('getaddrinfo')) {
      msg = 'Could not resolve Jira Workspace URL. Check the URL and your network connection.';
    } else if (msg.includes('ECONNREFUSED')) {
      msg = 'Connection refused by target server. Verify the Workspace URL and port.';
    }
    return { success: false, message: `Connection failed: ${msg}` };
  }
}

async function fetchJiraIssue(issueKey, customConfig = null) {
  const config = getJiraConfig(customConfig || {});
  if (!config.isConfigured) {
    throw new Error('Jira credentials not configured. Please configure your Jira settings.');
  }

  const cleanKey = issueKey.trim().toUpperCase();
  const authHeader = 'Basic ' + Buffer.from(`${config.email}:${config.token}`).toString('base64');

  const res = await fetch(`${config.baseUrl}/rest/api/3/issue/${encodeURIComponent(cleanKey)}`, {
    method: 'GET',
    headers: {
      'Authorization': authHeader,
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Jira issue '${cleanKey}' not found.`);
    }
    if (res.status === 401 || res.status === 403) {
      throw new Error(`Jira authentication failed (${res.status}). Verify JIRA_EMAIL and JIRA_API_TOKEN.`);
    }
    throw new Error(`Failed to fetch Jira issue '${cleanKey}': HTTP ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const fields = data.fields || {};

  let descriptionText = '';
  if (fields.description) {
    if (typeof fields.description === 'string') {
      descriptionText = fields.description;
    } else if (typeof fields.description === 'object') {
      descriptionText = extractTextFromAdf(fields.description);
    }
  }

  return {
    key: data.key,
    id: data.id,
    summary: fields.summary || 'Insufficient information to determine.',
    description: descriptionText.trim() || 'Insufficient information to determine.',
    issueType: fields.issuetype?.name || 'Story',
    priority: fields.priority?.name || 'Medium',
    status: fields.status?.name || 'Open',
    project: fields.project?.name || fields.project?.key || 'VWO Project',
    components: (fields.components || []).map(c => c.name),
    labels: fields.labels || [],
    assignee: fields.assignee?.displayName || 'Unassigned',
    creator: fields.creator?.displayName || 'Unknown',
    url: null // Redacted to prevent exposing private Jira workspace URL
  };
}

module.exports = {
  getJiraConfig,
  testJiraConnection,
  fetchJiraIssue
};
