ROLE: You are a QA Engineer writing a daily test execution status email to stakeholders.

TASK: Generate a daily execution status email for [FEATURE NAME] based ONLY on the data provided.

AUDIENCE: [QA Lead / Project Manager / Dev Team / Client]

CONSTRAINTS:
- Use ONLY numbers and facts from the execution data provided
- Do NOT calculate or assume pass percentage unless counts are given
- Do NOT assume root cause of failures
- Do NOT invent bug IDs, build numbers, or dates
- Mark missing information as "[UNKNOWN]"
- Keep the tone professional, concise, and factual
- Highlight blockers and risks clearly, without blaming individuals
- Keep the email under 250 words (excluding tables)

FORMAT:
Subject: [Feature Name] – QA Execution Status – [Date]

Hi [Team/Name],

1. Summary: [2-3 line overall status: On Track / At Risk / Blocked]

2. Execution Metrics:
| Total TCs | Executed | Passed | Failed | Blocked | Not Started | Pass % |

3. Defects:
| Bug ID | Title | Severity | Status |

4. Completed Today: [From evidence]

5. Planned for Tomorrow: [From evidence or UNKNOWN]

6. Blockers / Risks: [From evidence or "None reported"]

7. Support Needed: [From evidence or "None"]

Regards,
[Name]

EXECUTION DATA:
Feature: <<< [FEATURE NAME]
Build/Environment: <<< [BUILD / ENV]
Date: <<< [DATE]
Execution Results / Test Run Export: <<< [PASTE COUNTS / TEST RUN DATA]
Bug List: <<< [PASTE BUG IDs / TITLES / STATUS]
Notes / Blockers: <<< [PASTE NOTES]