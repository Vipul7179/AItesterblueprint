# Wingify login: RICEPOT test-case comparison

Prepared 13 November 2026. Target: https://app.wingify.com/#/login.

**Update:** The original comparison below is preserved as the pre-PRD evidence snapshot. The appended PRD update supersedes its current gap counts and missing-document statement. No live tests have been executed.

## Scope and experiment limits

This is a test-design comparison, not a test execution report. It covers login, as requested in the supplied templates, rather than all of app.wingify.com. No authentication requests were submitted and no tests were executed. The baseline below is an intentionally assumption-bearing demonstration generated without the local anti-hallucination constraints. It is not a historical model run or a controlled independent A/B experiment: both versions were prepared in this review after reading the supplied files. Unsupported baseline expectations must not be treated as product facts.

The user's request for test cases and a comparison takes precedence over the templates' older code-only and two-script output instructions. Existing automation files have not been changed.

## RICEPOT prompt: baseline without anti-hallucination rules

- **R — Role:** Act as an experienced QA tester designing Wingify login tests.
- **I — Instructions:** Generate positive, negative and remember-me login test cases with steps, data and expected outcomes.
- **C — Context:** Login URL supplied above; the template describes email, password, Sign in and Remember me. The referenced PRD is unavailable.
- **E — Example:** ID | scenario | precondition/data | steps | expected outcome.
- **P — Parameters:** Cover form display, successful authentication, rejected authentication, validation and remembered sessions.
- **O — Output:** A reviewable test-case table.
- **T — Tone:** Technical and concise.

## A. Baseline test cases

Common precondition: open a fresh browser session at the supplied login URL. Account fixtures below are placeholders, not actual credentials. The evidence classification was added during the later audit, not asserted by the baseline prompt.

| ID | Scenario and data | Steps | Baseline expected outcome | Later evidence audit |
|---|---|---|---|---|
| B01 | Login controls | Open login page | Email, password and Sign in are visible | Supported by template context only |
| B02 | Remember-me control | Open login page | Remember me is visible | Supported by template context only |
| B03 | Valid account; fixture VALID_ACCOUNT | Enter credentials; submit | Redirect to `#/dashboard`; dashboard is displayed | Unsupported success oracle and fixture |
| B04 | Known account; wrong password | Enter email and incorrect password; submit | Exact error: `Your email, password, IP address or location did not match`; remain on login | Code contains this expectation; no authoritative requirement |
| B05 | Unregistered email; arbitrary password | Enter data; submit | Same generic credentials error as B04 | Unsupported account state and response policy |
| B06 | Empty email and password | Clear both; submit | Required errors appear for both fields | Unsupported validation behavior |
| B07 | Empty email; supplied password | Leave email empty; submit | Email-required error; no authentication request | Unsupported message and request behavior |
| B08 | Supplied email; empty password | Leave password empty; submit | Password-required error; no authentication request | Unsupported message and request behavior |
| B09 | Malformed email `qa-at-example.invalid` | Enter malformed email and password; submit | Email-format error appears | Unsupported validation policy |
| B10 | Email with outer spaces; valid account | Add spaces around fixture email; submit | Spaces are trimmed; login succeeds | Unsupported normalization policy |
| B11 | Valid account; Remember me checked | Check option; submit; close and reopen browser; revisit | User remains authenticated for 30 days | Invented duration and persistence contract |
| B12 | Valid account; Remember me unchecked | Uncheck option; submit; close and reopen browser; revisit | Login is required again | Unsupported session contract |

## Anti-hallucination rules applied

Source: [local rules](../PlaywrightFramework/Prompts/anti-hallucination.rules.md), with the matching guardrails in both RICEPOT templates.

1. Use only supplied PRD, API documentation, logs, screenshots, test data or user input as factual evidence.
2. Do not invent features, APIs, error codes, elements or behavior.
3. Do not assume typical/default behavior.
4. For a missing answer, use exactly: **Insufficient information to determine.** Apply this per unknown field so the required gap report remains possible.
5. Trace every assertion to its input source.
6. Label any inference exactly **Inference (low confidence)**; an inference is not an acceptance oracle.
7. Keep output repeatable for a fixed evidence set. This is a workflow objective, not a guarantee that unconstrained model generation is deterministic.
8. Extract facts, list unknowns, generate only from facts, then check for unsupported assertions and contradictions.

For the revised RICEPOT prompt, retain R/I/C/E/O/T above and replace P with these rules plus: assign evidence IDs, mark unresolved cases blocked, distinguish approved requirements from proposals, and never treat generated code or mocks as proof of real product behavior.

## Verified Facts

Verified here means traceable to supplied material, not verified against the running application.

| Evidence | Source | Fact and limit |
|---|---|---|
| F01 | `Template.Playwrite.Ricepot.md`, Instructions | Target is `https://app.wingify.com/#/login`; valid and invalid login are in scope. |
| F02 | Both templates, Context | The described form has email, password, Sign in and Remember me. Exact accessible names and actual rendering are unverified. |
| F03 | Both templates, Instructions | A PRD named `Product Requirements Document_ VWO Login Dashboard.docx` is referenced. Workspace file inventory found no such document. |
| F04 | `PlaywrightFramework/Prompts/anti-hallucination.rules.md` | Claims must be traceable and unknown behavior cannot be invented. |
| F05 | `PlaywrightFramework/config.ts` | Repository configuration contains a claimed dashboard URL, credentials and rejection text. Their presence proves code content only; validity is unverified. Credentials are deliberately not reproduced here. |
| F06 | `PlaywrightFramework/tests/valid-login.spec.ts` | The positive test fulfills matching POST login requests with HTTP 200 and a JSON body containing status/location. This does not demonstrate genuine authentication or an actual HTTP redirect. No API contract was supplied. |
| F07 | `PlaywrightFramework/src/pages/LoginPage.ts` | Existing locators assume accessible names and a textbox role for password. These are implementation assumptions, not observed DOM evidence. |

Supplementary retrieval: [application page](https://app.wingify.com/) returned an application shell with loading/template content, not a usable rendered login form. Browser inspection failed because the browser access host was unavailable. This retrieval is not admitted as new product acceptance criteria under the local rule's restricted evidence list.

## Missing / Unknown Information

**20 distinct gaps were identified: 16 product/evidence gaps remain open and 4 task-definition gaps are resolved below.** Count is by the numbered decision/evidence need, not by test case or number of questions. Multiple cases may depend on one gap. For each open item, the factual answer is: **Insufficient information to determine.**

| Gap | Missing detail and evidence needed | Status |
|---|---|---|
| G01 | Authoritative PRD/version and approved login acceptance criteria | Open |
| G02 | Approved environment, non-production target if available, permitted test actions and attempt limits | Open |
| G03 | Provisioned active account, verified credential delivery and applicable account state/role | Open |
| G04 | Success destination and authenticated UI/session oracle; possible intermediate authentication steps | Open |
| G05 | Known invalid fixtures: existing-account/wrong-password and confirmed unregistered-account data | Open |
| G06 | Rejection policy: exact text if contractual, rendering and allowed post-failure navigation | Open |
| G07 | Both-empty submission behavior, including validation timing and authentication-request expectations | Open |
| G08 | Email-only-empty behavior and validation oracle | Open |
| G09 | Password-only-empty behavior and validation oracle | Open |
| G10 | Email syntax acceptance/validation rules and oracle | Open |
| G11 | Whitespace normalization and email case handling | Open |
| G12 | Password case/whitespace handling and accepted length boundaries | Open |
| G13 | Remember-me default, opt-in persistence duration and browser-restart behavior | Open |
| G14 | Unchecked session lifetime, inactivity expiry, logout invalidation and browser-restart behavior | Open |
| G15 | Current screenshots/DOM evidence: accessible labels, roles, control types and state | Open |
| G16 | Supported browser/device matrix and reproducible profile/restart conditions | Open |
| G17 | Whole application versus login scope | Resolved: login only, from template instructions |
| G18 | Selenium versus Playwright and conflicting locator examples | Resolved for this deliverable: framework-neutral manual cases; any future code needs a selected framework |
| G19 | Code-only/two scripts versus requested analysis and test-case comparison | Resolved: current user request governs; cases plus report |
| G20 | Whether repository assumptions/mocks count as product evidence | Resolved: evidence of existing code only; not authoritative behavior |

G12 is an uncovered requirement area, not an additional invented test. G01 is the missing source document; G04–G14 identify the specific acceptance decisions that document may resolve.

## Providing missing information responsibly

The workspace resolves G17–G20. It cannot supply genuine credentials, approved product policy or a missing PRD. Inventing those would invalidate this exercise. The following is a concrete **proposed clarification pack**, not supplied/approved Wingify requirements. Every proposed product choice below is **Inference (low confidence)** and must remain outside the verified evidence set until confirmed.

| Proposed item | Suggested completion | Gaps |
|---|---|---|
| P01 | Obtain a versioned PRD and record requirement IDs for each expected outcome. | G01 |
| P02 | Use an approved isolated environment; document permitted attempts before authentication tests. | G02 |
| P03 | Provision active and invalid-account fixtures via an approved secret channel. Do not use repository sample credentials as valid accounts. | G03, G05 |
| P04 | Product owner supplies the exact success route and a stable authenticated UI marker, including any intermediate steps. No route is proposed as fact. | G04 |
| P05 | Proposed requirement: rejected credentials do not create an authenticated session; product owner supplies approved error/navigation expectations. | G06 |
| P06 | Proposed requirement: all three missing-field combinations receive identified validation feedback; decide validation timing and whether requests are allowed. | G07–G09 |
| P07 | Product owner specifies accepted email syntax, normalization and password handling/limits; do not assume trimming or case folding. | G10–G12 |
| P08 | Supply exact persistence and expiry contracts for checked/unchecked options, logout, and a defined browser restart. No duration is proposed as fact. | G13–G14 |
| P09 | Supply current rendered-page evidence and supported browser/device/profile conditions. | G15–G16 |

This pack provides the missing-information structure and proposed decisions; it does not claim to resolve the 16 open gaps. Real product cases below remain blocked where those answers are needed.

## Generated Output: B. Revised test cases

Common precondition: navigate to F01 in a fresh session. “Ready for manual check” means the supplied context supports the design; it does not mean executed, passed or automation-ready. Use approved environment and fixtures before submitting credentials. For every blocked case the unresolved expected result is **Insufficient information to determine.**

| ID / baseline | Preconditions and data | Steps | Evidence-backed expected outcome / missing oracle | Design status and trace |
|---|---|---|---|---|
| A01 / B01 | Fresh session; no credentials | Open F01; inspect controls | Email input, password input and Sign in are visible, as described by F02. Do not assert exact accessible names. | Ready for manual check; F01–F02; automation needs G15 |
| A02 / B02 | Fresh session; no credentials | Open F01; inspect Remember me | Remember me control is visible, as described by F02. Do not assert default state or persistence. | Ready for manual check; F02; automation needs G15 |
| A03 / B03 | Approved active fixture and environment | Enter supplied valid credentials; submit; compare destination and authenticated marker with approved requirements | Insufficient information to determine. Do not assert `#/dashboard` or mocked authentication. | Blocked; G01–G04, G15 |
| A04 / B04 | Confirmed existing account and approved wrong password | Enter supplied fixture; submit once; inspect response/session/navigation against approved contract | Insufficient information to determine. Repository error string is not an approved oracle. | Blocked; G02, G05–G06, G15 |
| A05 / B05 | Confirmed unregistered fixture | Enter supplied fixture; submit once; inspect response against approved rejection policy | Insufficient information to determine. Do not assume response equality with A04. | Blocked; G02, G05–G06, G15 |
| A06 / B06 | Both inputs empty | Submit; compare feedback/timing/request behavior with approved criteria | Insufficient information to determine. | Blocked; G07, G15 |
| A07 / B07 | Empty email; approved nonempty password test value | Submit; compare email feedback and request behavior with approved criteria | Insufficient information to determine. | Blocked; G08, G15 |
| A08 / B08 | Approved email test value; empty password | Submit; compare password feedback and request behavior with approved criteria | Insufficient information to determine. | Blocked; G09, G15 |
| A09 / B09 | Email value classified invalid by approved syntax rules | Enter email and approved password value; submit; compare validation with policy | Insufficient information to determine. | Blocked; G10, G15 |
| A10 / B10 | Active fixture; whitespace variant defined by approved normalization policy | Enter variant; submit; compare outcome with policy | Insufficient information to determine. Do not assume trimming. | Blocked; G02–G04, G11, G15 |
| A11 / B11 | Active fixture; checked persistence contract; defined browser/profile | Select Remember me; authenticate; restart browser as specified; revisit at contract-defined times | Insufficient information to determine. Remove invented 30-day assertion. | Blocked; G02–G04, G13, G15–G16 |
| A12 / B12 | Active fixture; unchecked session contract; defined browser/profile | Deselect Remember me; authenticate; restart as specified; revisit | Insufficient information to determine. Do not equate closing a tab with session expiry. | Blocked; G02–G04, G14–G16 |

### Conditional cases after proposed requirements are approved

These demonstrate how additional information changes testability. They are not part of the evidence-backed A01–A12 readiness count and are not executable acceptance tests yet.

| ID | Additional requirement needed | Steps and resulting conditional oracle |
|---|---|---|
| C01 | P03–P04 approved, with actual fixture, route and authenticated marker recorded | Sign in with that fixture; assert the supplied route and marker. This replaces B03's guessed route with a requirement-derived oracle. |
| C02 | P03 and P05 approved, with explicit no-session requirement and approved session-check method | Submit approved wrong-password fixture; use approved session check to verify no authenticated session; verify supplied feedback/navigation. This replaces B04's unverified exact string. |
| C03 | P06 approved for all three empty-field combinations, with specified feedback and request policy | Run each combination; assert only its supplied validation feedback and request policy. Do not infer one combination from another. |
| C04 | P08 approved with duration T, allowed clock tolerance and restart procedure | Authenticate with Remember me selected; check persistence before T and expiry at the specified boundary using approved clock procedure. T remains an unfilled requirement, not an invented value. |

## Comparison and evaluation

| Measure | Baseline B01–B12 | Revised A01–A12 |
|---|---|---|
| Candidate cases | 12 | 12, paired one-to-one |
| Cases whose complete expected outcome is supported by supplied context | 2/12 | 2/12 |
| Unsupported outcomes presented as concrete acceptance results | 10/12 | 0/12; those 10 are explicitly blocked |
| Cases ready for manual checking from supplied context | 2; baseline failed to distinguish readiness | 2 explicitly marked |
| Cases requiring more product evidence | 10, concealed by confident expectations | 10 explicitly blocked with gap IDs |
| Distinct information gaps recorded | None in baseline output | 20: 4 resolved, 16 open |
| Executed / passed | 0 / 0 | 0 / 0 |

Counting rule: a case is unsupported if any required expected outcome lacks supplied authoritative support; code assumptions do not qualify. B01/B02 receive support only from the template's stated UI context. Thus 10/12 = 83.3% is the baseline **unsupported-case rate**, not a measured application-error rate. Revised output has no asserted unsupported acceptance outcomes, but does not magically make all 12 cases complete or correct.

Applying the rules improved traceability, disclosure of uncertainty and protection against false acceptance criteria. It removed a guessed success route, unverified error oracle, invented session duration and assumed validation policies. It also revealed why the existing mocked positive script cannot substantiate real successful login. Actual application accuracy and defect-detection improvement remain unmeasured until requirements, fixtures and rendered evidence are supplied and tests execute. The comparison supports better evidence discipline, not a numerical claim about real-world test accuracy or a causal model benchmark.

## Self-Validation Check

- All 12 baseline cases have a paired revised case; no blocked case is counted as ready or passed.
- All 20 gaps have one status: 4 resolved plus 16 open equals 20.
- Only the two context-supported UI cases receive concrete product expectations in the revised suite.
- Repository values, mock responses, proposed requirements and observed application behavior remain distinct.
- No real credentials, API schemas, exact live locators, session periods or successful execution results were fabricated.
- The initial fact-extraction step can be completed from supplied files. Generation proceeds only for those facts; the remaining case entries report blockers rather than inventing missing answers.
- Resolving product gaps and executing a completed authentication suite require external evidence; this report does not claim that work is complete.

## PRD update: newly supplied evidence

Source F08: user-supplied `Product Requirements Document: VWO Login Dashboard`, provided as `Pasted text.txt`. Its contents are requirements evidence, not proof of implemented behavior. Number suffixes such as `56` and `213` have no accompanying bibliography and are not treated as independently verified citations. No external product claims in its executive summary are needed for these cases.

The document identifies **app.vwo.com**, whereas the task and templates identify **app.wingify.com**. Applicability to the requested target is unresolved. The PRD also separates implementation into phases and labels some features optional or future. Consequently, PRD-derived cases are conditional on target and release confirmation; they must not be reported as failures merely because a feature is absent from an unconfirmed release.

### Verified Facts from the PRD

The following IDs are assigned here for traceability; they are not original PRD requirement IDs.

| ID | PRD section | Supplied requirement |
|---|---|---|
| R01 | Authentication System / Login Process | Email/password authentication; secure sessions with configurable timeout; optional 2FA and enterprise SSO capabilities. |
| R02 | User Input Validation | Validation on blur; automatic email-format validation; password-strength feedback; clear, actionable authentication errors. |
| R03 | Password Management | Forgot-password recovery, email-based recovery and secure token generation; password-complexity standards. |
| R04 | Interface Design | Responsive mobile interface, first-input autofocus, clickable labels and authentication loading feedback. |
| R05 | Accessibility Features; Accessibility Standards | Screen-reader support, keyboard access, high contrast and WCAG 2.1 AA compliance. |
| R06 | Existing Features; Branding and Visual Design | Remember-me checkbox, free-trial registration link, and Light/Dark theme support. |
| R07 | Integration Requirements; Returning User Experience; Error Recovery Flow | Successful authentication transitions to personalized main dashboard and gives success confirmation; previous-session context is preserved. |
| R08 | Data Protection; Rate Limiting | HTTPS login communications, secure session tokens and request throttling; storage and encryption requirements also appear but need clarification. |
| R09 | Performance Requirements; Success Metrics | Login load within 2 seconds / sub-2-second KPI; 99.9% uptime and other aggregate goals. Measurement conditions are absent. |
| R10 | Integration Requirements | Login success/failure analytics, customer-support integration; optional social identity providers. |

### Updated Missing / Unknown Information

**Current total: 23 gaps — 4 resolved, 8 partially resolved, 11 open.** There are 19 gaps with unresolved information. The original 20-gap count remains valid only for the pre-PRD snapshot. A partially resolved gap is not counted as fully closed, and is not counted again as open.

| Gap | Current status | What the PRD resolves / what remains missing |
|---|---|---|
| G01 | Partially resolved | PRD text is now supplied. Version, approval status and authoritative release baseline remain unspecified. |
| G02 | Open | Approved environment, permitted actions and attempt limits are absent. |
| G03 | Open | No provisioned active credentials or account-state/role fixtures. |
| G04 | Partially resolved | R07 establishes main/personalized dashboard and success confirmation. Exact route, stable authenticated marker and applicable intermediate authentication remain unspecified. |
| G05 | Open | No confirmed existing-account/wrong-password or unregistered-account fixtures. |
| G06 | Partially resolved | R02 requires clear, actionable failure messages. Exact contractual message, objective clarity rubric, navigation and session checks remain unspecified. |
| G07 | Partially resolved | R02 establishes validation on blur generally. Both-empty requiredness, exact feedback and submission/request behavior remain unspecified. |
| G08 | Partially resolved | General on-blur validation is supplied; email-empty behavior and submission policy remain unspecified. |
| G09 | Partially resolved | General on-blur validation is supplied; password-empty behavior and submission policy remain unspecified. |
| G10 | Partially resolved | R02 requires email-format verification. Accepted syntax corpus, internationalized addresses and exact feedback remain unspecified. |
| G11 | Open | Email trimming/case-normalization policy is absent. |
| G12 | Open | Complexity and strength feedback are mentioned, but login-versus-password-creation scope, limits and password case/whitespace handling are absent. |
| G13 | Open | Remember-me presence/purpose was already supplied. Default state, duration and restart contract remain absent. |
| G14 | Open | Configurable timeout is mentioned, but configured values, unchecked-session behavior, logout invalidation and restart contract are absent. |
| G15 | Partially resolved | R04–R05 supply interaction/accessibility intent. Current rendered evidence, actual labels/roles and exact control implementation remain absent. |
| G16 | Open | Mobile/WCAG goals do not specify supported browsers/devices, profiles, performance network conditions or repeatable test configurations. |
| G17 | Resolved | Login scope retained; broader PRD features appear below as additional conditional coverage. |
| G18 | Resolved | This deliverable remains framework-neutral manual test design. |
| G19 | Resolved | Current requested analysis governs output. |
| G20 | Resolved | Generated code and mocks remain implementation evidence only. |
| G21 | Open — new | Confirm that this app.vwo.com PRD applies to app.wingify.com, or provide the correct target-specific PRD. |
| G22 | Open — new | Identify deployed phase and enabled features/account capabilities. Resolve optional 2FA/social login, enterprise SSO, theme and other phased requirements. Future biometric/adaptive/PWA items are excluded pending scope approval. |
| G23 | Open — new | Clarify end-to-end versus transport encryption, and the ambiguous “encrypted password storage using ... hashing algorithms” wording. Specify approved security criteria and inspection evidence; UI behavior cannot prove storage implementation. |

For every remaining unspecified detail: **Insufficient information to determine.** The gap register counts decision categories, not individual parameters. Further test-specific parameters below roll into these categories; they are not claimed to be fully resolved.

### Revised RICEPOT input after PRD provision

- **R:** QA test designer using only supplied requirements and evidence.
- **I:** Preserve the baseline; revise paired cases and add PRD-derived coverage. Do not execute or claim deployed functionality.
- **C:** F01–F08 and R01–R10; target mismatch G21; deployed phase G22 unknown.
- **E:** Case ID, preconditions/data, actions, expected outcome, trace, remaining blockers.
- **P:** Apply the local anti-hallucination rules; no guessed credentials, routes, durations, messages or selectors. Distinguish requirement-supported expectations from observed application results.
- **O:** Updated case matrix, gap status and comparison.
- **T:** Precise and explicit about uncertainty.

### C. Cases generated after supplying the PRD

All cases below require G21/G22 resolution before acceptance execution against Wingify. “Requirement-supported” means the PRD supplies the stated expectation; it does not mean the implementation was observed. Exact values still missing retain the mandated unknown response. No credentials are included.

| ID / earlier case | Preconditions / data | Actions | Expected outcome grounded in supplied requirements | Trace / remaining blockers |
|---|---|---|---|---|
| D01 / A01–A02 | Fresh login session | Inspect form | Email, password, Sign in and Remember me controls are present. | F02, R01, R06; G15 for automation |
| D02 / A03 | Provisioned active account; applicable auth path known | Enter valid supplied credentials; complete configured auth steps; submit | Successful authentication gives access to personalized main dashboard and clear success confirmation. Exact route/marker: Insufficient information to determine. | R01, R07; G02–G04 |
| D03 / A04 | Known account and approved incorrect password | Submit fixture once; inspect feedback | Failed authentication displays clear, actionable feedback. Exact string/session/navigation: Insufficient information to determine. | R02; G02, G05–G06 |
| D04 / A05 | Confirmed unregistered-account fixture | Submit once; inspect feedback | Failed authentication displays clear, actionable feedback. Do not assume identical text to D03. | R02; G02, G05–G06 |
| D05 / A06–A08 | Three variants: both blank, email blank, password blank | Blur affected fields; attempt submission only under approved plan | Empty-field requiredness, feedback and request behavior: Insufficient information to determine. General blur-validation requirement alone does not specify these cases. | R02; G07–G09 |
| D06 / A09 | Email corpus classified by approved syntax policy | Enter each invalid-format value; move focus away | Email validation occurs on blur and identifies invalid format. Accepted corpus/message: Insufficient information to determine. | R02; G10 |
| D07 / A10 | Active fixture and approved normalization rule | Submit whitespace/case variants specified by policy | Insufficient information to determine. PRD adds no normalization rule. | G02–G04, G11 |
| D08 / A11 | Active fixture; checked persistence contract | Select Remember me; authenticate; restart/revisit using approved procedure | Checkbox supports remembered/persistent login intent. Exact retention period, stored state and restart outcome: Insufficient information to determine. | R06; G02–G04, G13, G16 |
| D09 / A12 | Active fixture; unchecked-session contract | Deselect Remember me; authenticate; restart/revisit as specified | Insufficient information to determine. | R01; G02–G04, G14, G16 |
| D10 / new | Initial load; no competing user focus action | Open login page; inspect active element | First input receives automatic focus. Exact input order requires rendered evidence. | R04; G15 |
| D11 / new | Rendered email/password label associations | Activate each form label | Associated input receives focus. | R04; G15 |
| D12 / new | Approved authentication fixture; observable processing interval | Submit; inspect feedback while authentication is in progress | Loading feedback is shown during processing. Indicator appearance and timing thresholds: Insufficient information to determine. | R04; G02–G05, G15 |
| D13 / new | Login form rendered | Follow free-trial registration link without creating an account | Link provides a path to free-trial signup. Exact destination: Insufficient information to determine. | R06; G15; route detail under G01 |
| D14 / new | Recovery feature enabled; controlled test mailbox and approved account | Start Forgot password; request email recovery | Email-based recovery path is available. Exact feedback, delivery SLA, token lifetime and single-use policy: Insufficient information to determine. Do not change credentials in this design review. | R03; G02–G03, G22; recovery contract under G01 |
| D15 / new | Supported browser/device and accessibility evaluation plan | Navigate interactive elements by keyboard; inspect screen-reader semantics and labels; evaluate WCAG 2.1 AA criteria | All interactive elements are keyboard accessible; screen-reader support and WCAG 2.1 AA requirements apply. Formal conformance requires a defined full audit, not one tab-through. | R05; G15–G16 |
| D16 / new | Supported mobile viewport/device and layout criteria | Open login; inspect and operate controls | Responsive, mobile-optimized form with touch-friendly controls. Exact viewport matrix and objective layout/touch criteria: Insufficient information to determine. | R04; G15–G16 |
| D17 / new | Confirmed theme/high-contrast feature scope | Select available Light/Dark and high-contrast options; inspect form | PRD requires Light/Dark support and high-contrast accessibility. Control mechanism and persistence: Insufficient information to determine. | R05–R06; G15, G22 |
| D18 / new | Approved measurement plan: connection/device, cache state, load milestone and sample aggregation | Measure login load under agreed conditions | PRD says within 2 seconds and KPI says sub-2 seconds. Exact boundary convention and measurement plan: Insufficient information to determine. Do not claim a performance pass from an arbitrary browser load. | R09; G01, G16 |

D05 is a parameterized case family with three variants. The matrix has **18 rows / 20 scenario instances** when those variants are expanded. These totals are not directly comparable as a quality metric with the original 12 cases because requirements and coverage changed.

### Additional coverage requiring specialist evidence or configured features

- R01/R10: Add 2FA, SSO and optional social-login cases only after feature enablement, provider/protocol configuration, test identities and challenge/recovery contracts are supplied (G01–G03, G22). Do not infer Google/Microsoft availability from optional wording.
- R02/R03: Add password-strength/complexity cases once policy and whether it applies on login, reset or registration are confirmed (G12, G22). Do not enforce a newly invented password policy on existing login credentials.
- R08: HTTPS/session-token inspection needs approved environment and security criteria. Hashing/storage and encryption require architecture/configuration or controlled backend evidence (G02, G14, G23).
- R08: Rate-limit tests require threshold/window, recovery behavior, isolated accounts and approved attempt budget (G01–G02). No brute-force/load testing was performed.
- R01: Timeout tests need configured idle/absolute timeout and an approved clock procedure (G14).
- R07/R10: Context restoration, analytics events and support integration need defined expected state, event schema and observable integration evidence (G01, G03–G04).
- R09: Uptime, aggregate success rate, concurrency and satisfaction KPIs require observation windows, sample/population definitions, instrumentation and load/measurement plans (G01–G02, G16). They cannot be validated by a single login case.

### Updated comparison and evaluation

| Dimension | Original baseline | Rules applied before PRD | Rules applied with supplied PRD |
|---|---|---|---|
| Evidence | Template context plus unverified assumptions | Supplied context, explicit gaps | Supplied context and PRD, with domain/release ambiguity |
| Success oracle | Guessed `#/dashboard` | Unknown; blocked | Main personalized dashboard + success confirmation supported; exact route still unknown |
| Failure oracle | Unverified exact error | Unknown; blocked | Clear/actionable failure feedback supported; exact error still unknown |
| Validation | Assumed required errors and submit behavior | Unknown; blocked | On-blur/email-format validation supported; empty-field details remain unknown |
| Remember me | Invented 30-day duration | Duration withheld | Persistence intent supported; duration still withheld |
| Added coverage | No explicit PRD trace | No invented feature coverage | Autofocus, labels, loading, signup, recovery, accessibility, mobile, themes and performance traced to requirements |
| Gaps | Not disclosed | 20: 4 resolved, 16 open | 23: 4 resolved, 8 partial, 11 open |
| Runtime results | Not executed | Not executed | Not executed |

The PRD improves the specificity and breadth of test design. Anti-hallucination rules prevent that added detail from being mistaken for deployed behavior: they also expose target mismatch, uncertain release scope and ambiguous security language. More detected gaps after adding a document reflects newly visible decisions, not worse test quality. Neither the supplied PRD nor this comparison establishes that 2FA, SSO or any other feature actually exists at the requested URL.

This is not a controlled causal evaluation: supplying the PRD changes the input as well as the generated coverage. The defensible conclusion is that evidence discipline improved, and PRD-backed expectations are better grounded. Actual accuracy, execution readiness and defect-detection improvement remain unmeasured.

### Updated Self-Validation Check

- The supplied PRD is now incorporated; its absence is historical only.
- Current status counts reconcile: 4 resolved + 8 partial + 11 open = 23; 19 remain unresolved in full or part.
- Original baseline is preserved; newly supplied evidence has not been retroactively attributed to it.
- D01–D18 trace expectations to supplied evidence and retain unknown parameters explicitly.
- Domain applicability and deployed phase gate the PRD-derived suite; future features are excluded from acceptance claims.
- No approved requirement, credential, route, message, timing contract, product deployment or test result has been invented.
