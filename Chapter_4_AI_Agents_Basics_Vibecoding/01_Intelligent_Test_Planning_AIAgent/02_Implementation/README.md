# AI-Powered Jira Test Plan Generator

A lightweight, production-ready QA Test Planning Agent built with Node.js and React. It retrieves Jira issue requirements via Atlassian REST APIs and generates standardized, enterprise-grade test plans strictly matching the RICE-POT / TestPlan template.

---

## Architecture & Structure

```
02_Implementation/
├── package.json               # Manifest & start script
├── README.md                  # Project documentation
├── .gitignore                 # Standard exclusions
└── src/
    ├── backend/
    │   ├── server.js          # Lightweight Node.js HTTP server & API routes
    │   ├── jiraService.js     # Jira Cloud REST API v3 integration
    │   └── testPlanGenerator.js# Groq AI & deterministic template generator
    └── frontend/
        ├── index.html         # HTML5 shell loading React 18
        ├── app.js             # React application components & state
        └── styles.css         # Modern, responsive UI design
```

---

## Configuration

Credentials are read automatically from the parent `.env` file (`C:\AItester\.env`):
- `JIRA_URL`: Jira Cloud base URL (`https://vpsvipulsingh100.atlassian.net`)
- `JIRA_EMAIL`: Jira account email (`vpsvipulsingh100@gmail.com`)
- `JIRA_API_TOKEN`: Atlassian API Token
- `GROQ_API_KEY`: Groq API Key for Llama 3.3 70B AI generation

*Note: Secrets are never exposed to the frontend or committed to source control.*

---

## Running the Application

### 1. Start the Server
From `02_Implementation` (or workspace root):
```bash
node src/backend/server.js
```
The server will start on: **`http://localhost:3000`**

### 2. Open in Browser
Visit **`http://localhost:3000`** to interact with the Test Plan Generator and Settings dashboard.

---

## Features
- **Jira Issue Fetching**: Enter any Jira issue ID (e.g. `KAN-1`) to fetch its summary, description, and status.
- **Strict Template Compliance**: Outputs test plans following `TestPlan_Template.md` with explicit Gaps, Test Scenarios table, Risks, and Human Review Gate.
- **Anti-Hallucination Safe**: Marks missing application details as `"Insufficient information to determine."` and inferences as `"Inference (low confidence)"`.
- **Integrated Settings**: Live Jira API connectivity verification without revealing tokens.
- **Export & Copy**: One-click clipboard copy and `.md` file download.
