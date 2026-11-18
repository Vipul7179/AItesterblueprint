function getJiraConfig() {
  const url = process.env.JIRA_URL || 'https://vpsvipulsingh100.atlassian.net';
  const email = process.env.JIRA_EMAIL || '';
  const token = process.env.JIRA_API_TOKEN || '';
  return {
    baseUrl: url.replace(/\/+$/, ''),
    email,
    token,
    isConfigured: Boolean(email && token)
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

async function testJiraConnection() {
  const config = getJiraConfig();
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
      const data = await res.json();
      return {
        success: true,
        displayName: data.displayName || 'Authorized Account'
      };
    } else {
      return {
        success: false,
        status: res.status,
        message: `Jira returned HTTP ${res.status}: ${res.statusText}`
      };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function fetchJiraIssue(issueKey) {
  const config = getJiraConfig();
  if (!config.isConfigured) {
    throw new Error('Jira credentials not configured.');
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
      throw new Error(`Jira authentication failed (${res.status}). Verify credentials.`);
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
    url: `${config.baseUrl}/browse/${data.key}`
  };
}

module.exports = {
  getJiraConfig,
  testJiraConnection,
  fetchJiraIssue
};
