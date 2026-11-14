# Wingify Login Page – Test Cases (CLEAR Framework)

**Target Application:** https://app.wingify.com/#/login  
**Framework Methodology:** CLEAR Framework (Context, Limits, Examples, Action, Review)  
**Limit:** Exactly 4 Test Cases  
**Format:** Tabular (Testcase id, Testcase name, Step, Action, Expected result)

---

## Test Cases Table

| Testcase id | Testcase name | Step | Action | Expected result |
|---|---|---|---|---|
| **TC_01** | Login with Valid Credentials | 1. Navigate to https://app.wingify.com/#/login<br>2. Enter valid registered email in "Email address" field<br>3. Enter valid password in "Password" field<br>4. Click "Sign in" button | Enter valid credentials and submit login form | User is successfully authenticated and redirected to the application dashboard (https://app.wingify.com/#/dashboard). |
| **TC_02** | Login with Invalid Credentials | 1. Navigate to https://app.wingify.com/#/login<br>2. Enter invalid email in "Email address" field<br>3. Enter invalid password in "Password" field<br>4. Click "Sign in" button | Submit invalid credentials on the login form | Login is rejected; user remains on the login page (https://app.wingify.com/#/login) and is not granted access. |
| **TC_03** | Sign In Button Validation | 1. Navigate to https://app.wingify.com/#/login<br>2. Inspect "Sign in" button visibility and enabled state<br>3. Click "Sign in" and observe button state transitions | Verify "Sign in" button rendering, label, and clickability | "Sign in" button is visible, enabled, displays exact text "Sign in", and exhibits an active loading state (`is-in-action`) upon form submission. |
| **TC_04** | Error Message Population for Invalid Credentials | 1. Navigate to https://app.wingify.com/#/login<br>2. Enter incorrect email or password<br>3. Click "Sign in" button<br>4. Observe the notification box above the input fields | Trigger authentication failure and inspect error message | A warning notification banner is populated displaying the exact message: "Your email, password, IP address or location did not match". |
