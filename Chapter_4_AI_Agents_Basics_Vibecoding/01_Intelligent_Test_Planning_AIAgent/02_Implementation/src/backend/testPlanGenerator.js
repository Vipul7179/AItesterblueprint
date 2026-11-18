const fs = require('fs');

async function callGroqAi(prompt, systemPrompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 3000
      })
    });

    if (!res.ok) {
      console.warn(`Groq API returned HTTP ${res.status}: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.warn('Groq API invocation failed:', err.message);
    return null;
  }
}

function generateDeterministicPlan(issue) {
  const key = issue.key || 'QA-001';
  const summary = issue.summary || 'Feature Implementation';
  const desc = issue.description || 'Insufficient information to determine.';

  return `# Test Plan — ${key}: ${summary}

> Status: **DRAFT — pending human review.** Not approved until a QA owner signs off.

## 1. Scope & Objectives
- **In scope:** Verification of requirements described in ${key} ("${summary}"). Validation of UI controls, functional interactions, error states, and responsive behavior.
- **Out of scope:** Backend database performance profiling, third-party network outages, and unreferenced legacy integrations unless specified.
- **Objective:** What "tested" means for this ticket: All functional paths, negative inputs, and acceptance criteria defined in ${key} execute with zero high-severity defects.

## 2. Gaps & Questions for the author
| # | Area | Finding (⚠️/❌) | Question to author |
|---|------|----------------|--------------------|
| 1 | Acceptance Criteria | ⚠️ Requirements detail level | Are edge case validations and session boundary limits defined? (Insufficient information to determine) |
| 2 | Error Contracts | ⚠️ Expected error messages | What exact user-facing error message must display upon failure? (Insufficient information to determine) |
| 3 | Target Environment | ⚠️ Test environment | Which staging/sandbox URL and deployment tier is designated for testing? (Insufficient information to determine) |

## 3. Test Scenarios
| ID | Priority | Type (pos/neg/boundary) | Scenario | Maps to (AC / gap) |
|----|----------|-------------------------|----------|--------------------|
| TS-1 | P0 | Positive | Verify primary successful workflow for ${key} with valid inputs | ${key} - Core Requirement |
| TS-2 | P0 | Negative | Verify validation and error response when required inputs are omitted | ${key} - Field Validation |
| TS-3 | P1 | Negative | Verify system behavior when invalid or unauthorized data is supplied | ${key} - Security / Error Handling |
| TS-4 | P1 | Boundary | Verify maximum character length boundaries and unusual inputs | ${key} - Boundary Validation |
| TS-5 | P2 | UI / Accessibility | Verify UI layout responsiveness, keyboard navigation, and WCAG standards | ${key} - UI Specifications |

## 4. Test Data & Environment
- **Data:** Valid test account fixtures, invalid test credentials, and boundary strings.
- **Environment / flags:** Staging / QA test environment. Feature flags: Insufficient information to determine.
- **Roles / permissions:** Standard user role and administrative user role.

## 5. Risks & Assumptions
- **Assumptions made:** System adheres to standard web security (HTTPS) and responsive viewport conventions. Inference (low confidence).
- **Risks:** Incomplete requirement specifications in ticket description may cause scope discrepancy during QA sign-off.

## 6. Entry / Exit criteria
- **Entry:** Build deployed to test environment, smoke tests pass, test data provisioned.
- **Exit:** 100% P0 and P1 test scenarios executed, zero open blocker or critical bugs, QA review completed.

## 7. Resource Allocation
- **Assigned QA:** QA Automation Specialist
- **Reviewer:** QA Lead / Product Owner

## 8. Timelines, Sprint Details
- **Sprint:** Current active sprint
- **Execution Target:** 2 days following deployment to staging

---
## HUMAN REVIEW GATE
- **I assumed:** Standard enterprise web application patterns and default error handling apply.
- **I could not confirm:** Specific environment configuration and production API rate limits.
- **Open questions blocking sign-off:** Clarification on Questions listed in Section 2.
- **Approve, or edit, before I write test cases / automation.**
`;
}

async function generateTestPlan(issue) {
  const systemPrompt = `You are a Senior QA Automation Architect with 15+ years of experience.
Your job is to generate a comprehensive, professional Test Plan strictly following the provided template format.
Strict rules:
- Strictly follow the sections, headings, and markdown tables of the template.
- Every assertion must be traceable to the provided Jira ticket requirements.
- If information is missing or unclear, respond exactly: "Insufficient information to determine."
- If a detail is inferred, label it exactly: "Inference (low confidence)".
- Do not invent features, IDs, APIs, error codes, UI elements, or behavior.`;

  const userPrompt = `Generate a Test Plan following this exact template structure:
# Test Plan — <JIRA-KEY>: <title>
> Status: **DRAFT — pending human review.** Not approved until a QA owner signs off.

## 1. Scope & Objectives
- **In scope:**
- **Out of scope:**
- **Objective:** what "tested" means for this ticket.

## 2. Gaps & Questions for the author
| # | Area | Finding (⚠️/❌) | Question to author |
|---|------|----------------|--------------------|

## 3. Test Scenarios
| ID | Priority | Type (pos/neg/boundary) | Scenario | Maps to (AC / gap) |
|----|----------|-------------------------|----------|--------------------|

## 4. Test Data & Environment
- **Data:**
- **Environment / flags:**
- **Roles / permissions:**

## 5. Risks & Assumptions
- **Assumptions made:**
- **Risks:**

## 6. Entry / Exit criteria
- **Entry:**
- **Exit:**

## 7. Resource Allocation

## 8. Timelines, Sprint Details

---
## HUMAN REVIEW GATE
- **I assumed:** …
- **I could not confirm:** …
- **Open questions blocking sign-off:** …
- **Approve, or edit, before I write test cases / automation.**

Here is the retrieved Jira Issue Data:
- Key: ${issue.key}
- Summary: ${issue.summary}
- Type: ${issue.issueType}
- Priority: ${issue.priority}
- Status: ${issue.status}
- Description:
${issue.description}`;

  const aiResult = await callGroqAi(userPrompt, systemPrompt);
  if (aiResult && aiResult.includes('## 1. Scope & Objectives')) {
    return aiResult;
  }

  return generateDeterministicPlan(issue);
}

module.exports = {
  generateTestPlan
};
