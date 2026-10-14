# Critical Thinking Project: Source Code Management for a Distributed Development Team

## Scenario

You are a senior DevOps engineer for a mid-sized software development company. Your team is transitioning from a centralized development process to a distributed team, with developers working across multiple geographic locations. Previously, the team used a centralized version control system (VCS) like Subversion (SVN), but now they are considering moving to a distributed version control system (DVCS), with Git being a strong candidate.

Your task is to evaluate and implement the best practices for SCM, ensuring that the transition to a distributed VCS is smooth, secure, and scalable. Additionally, you need to address potential challenges like managing feature branches, ensuring code quality, and automating key processes.

## Project Tasks

*Task 1: Evaluate Different SCM Tools*
Research: Start by comparing centralized and distributed version control systems. What are the key differences between tools like Subversion (SVN) and Git?
Evaluate the advantages and challenges of using Git in a distributed environment over a centralized system like SVN or Mercurial.
Deliverable: Write a report highlighting the key reasons why your team should move to Git or an alternative DVCS. Discuss how distributed teams benefit from DVCS tools.

*Answer task 1:*
Software Configuration Management (SCM) is the process of managing, tracking, and controlling changes to source code, configuration files, documentation, and other project resources throughout the software development lifecycle.
In a mid-sized software development company with developers working across different geographical locations, an effective SCM system is essential for collaboration, security, code quality, and reliable software delivery.
Two major types of version control systems are:

- Centralized Version Control System (CVCS): A central server stores the main version history. Examples include Apache Subversion (SVN) and Perforce.
- Distributed Version Control System (DVCS): Each developer has a local repository containing the project history. Examples include Git and Mercurial.

Git is a strong candidate for the company's transition because it supports distributed collaboration, efficient branching, and integration with modern CI/CD tools.

*Task 2: Implement Git Workflows for a Team Project*
Scenario: Assume the team is developing a new web application. Developers need to work on multiple features simultaneously while maintaining a stable main branch.

Implement a Git workflow that supports the following:

Feature branching
Pull requests for code reviews
Integration testing before merging code into the main branch
Deliverable: Document a Git workflow guide for your team. Include branching strategies, how to handle pull requests, and best practices for merging and rebasing. Ensure that you describe how this workflow facilitates collaboration in a distributed team.

*Answer to task 2:*

Git Workflow Guide for a Team Project
This guide explains how a development team can use Git and GitHub to develop a web application collaboratively while keeping the main branch stable and reliable.
The workflow allows multiple developers to work on different features simultaneously, submit code for review, run automated integration tests, and merge only approved changes into the main branch.
Objectives:

- Enable feature branching for parallel development.
- Use pull requests (PRs) for code reviews.
- Run automated tests before merging.
- Maintain a stable and deployable main branch.
- Support effective collaboration among distributed team members.

Branching strategy
The team will use a feature-branch workflow. Each developer creates a separate branch for a new feature or bug fix instead of making changes directly to main.
main branch
Stable, tested and production-ready code

Create feature branches
feature/login
Developer A
feature/payment
Developer B
Pull requests → Code review → Automated tests
Merge approved changes into main
Only after all required checks pass
Feature branches should be short-lived and focused on one task. This makes code reviews easier and reduces merge conflicts.

Step-by-step Git workflow
Step 1: Clone the repository
Each developer downloads a local copy of the shared GitHub repository.

```bash
git clone git@github.com:USERNAME/PROJECT.git
cd PROJECT
```
Replace USERNAME/PROJECT with your GitHub username and repository name.
Step 2: Update the main branch
Before starting new work, obtain the latest version of the shared code.
git switch main
git pull origin main

This helps developers begin from the latest approved code.
Step 3: Create a feature branch
For example, a developer implementing a login page creates a new branch.
git switch -c feature/user-login

Another developer can independently work on payments:
git switch main
git pull origin main
git switch -c feature/payment

The two developers can now work in parallel without directly changing each other's branches.
Step 4: Develop, stage and commit changes
After editing the application files, check the changes and commit them.
git status
git add .
git commit -m "Add user login feature"

Best practices:

- Make small, meaningful commits.
- Use clear commit messages.
- Avoid committing passwords, API keys, or other secrets.
- Test changes locally before committing.

Step 5: Push the feature branch
Upload the feature branch to GitHub so teammates can review and collaborate on it.
git push -u origin feature/user-login

The -u option sets the upstream branch, making future pushes easier.

Step 6: Open a pull request
On GitHub:

1. Open the project repository.
2. Select Compare & pull request for the feature branch.
3. Set the base branch to main.
4. Add a descriptive title and explain the changes.
5. Describe the tests performed and any potential risks.
6. Assign reviewers and create the pull request.

A pull request allows team members to inspect proposed changes before they become part of the shared main branch.

Pull request and code review rules
Every feature must go through a pull request before it can be merged into main.

Reviewers should check:

- Code correctness, readability and maintainability.
- Security vulnerabilities and accidental exposure of secrets.
- Compliance with project coding standards.
- Unit and integration test coverage.
- Performance issues and compatibility with existing functionality.

Pull request approval policy
The team should configure GitHub branch protection or a repository ruleset with these requirements:

1. At least one approval from another developer.
2. All required automated checks must pass.
3. All requested changes must be addressed.
4. No unresolved review conversations should remain.
5. Direct pushes to main should be blocked.
6. The branch must be up to date with main when required by the chosen merge policy.
For critical or security-sensitive changes, require approval from an appropriate code owner as well.

Integration testing before merging
Integration testing checks whether the new feature works correctly with other parts of the application.
The team should automate testing using a continuous integration (CI) tool such as GitHub Actions.
Recommended testing pipeline

Pull request opened or updated
Developer pushes feature changes

Code quality checks
Linting, formatting and static analysis

Automated tests
Unit tests and integration tests

Build and security checks
Verify the application builds and scan dependencies

Review and merge decision
Required approvals and successful checks

Merge into main
Run post-merge checks and deploy according to policy

Example GitHub Actions workflow
Create the following file in the repository:
.github/workflows/ci.yml

```yaml
name: Web Application CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run lint checks
        run: npm run lint --if-present

      - name: Run unit tests
        run: npm test --if-present

      - name: Build application
        run: npm run build --if-present
```
Important: This example assumes a Node.js application with a committed package-lock.json. The team must add or configure integration-test commands and security scans according to the actual project. The optional commands shown above do not guarantee that tests or builds exist or have run; configure required checks that genuinely execute the intended validation.
Before merging, GitHub should show all required CI checks as successful. If a test fails, the developer fixes the problem, pushes another commit to the feature branch, and waits for the checks to run again.

Best practices for merging and rebasing
Git offers several ways to integrate changes. The team should agree on a consistent policy.
Merging
A merge combines the changes from one branch into another.
git switch feature/user-login
git fetch origin
git merge origin/main

After resolving any conflicts and running tests, push the updated branch:
git push origin feature/user-login

Once the pull request is approved, merge it into main using GitHub.
Advantages: Merging preserves the history of branch integration and does not rewrite existing commits.
Rebasing
Rebasing replays a feature branch's commits on top of the latest main branch.
git fetch origin
git switch feature/user-login
git rebase origin/main

If conflicts occur:
Edit the conflicting files, then:
git add path/to/file
git rebase --continue
To cancel the rebase and return to the previous state:
git rebase --abort

After a successful rebase, run the tests again. If the branch was already pushed, updating it may require:
git push --force-with-lease origin feature/user-login

Use this only on your own feature branch and coordinate with anyone sharing it. Avoid force-pushing shared branches and never rewrite the published history of main.
Recommended team policy: Rebase your own feature branch on the latest main when appropriate, then use a pull request to review and test the changes. Choose either squash merging or merge commits for integrating approved PRs and document that decision. Do not rebase branches that other developers are actively using without coordination.

Handling merge conflicts
Merge conflicts occur when Git cannot automatically reconcile competing changes, such as when two developers edit the same lines.
Example workflow:
git fetch origin
git switch feature/user-login
git merge origin/main

If Git reports a conflict:

1. Run git status to identify conflicting files.
2. Open each file and locate the conflict markers: <<<<<<<, =======, and >>>>>>>.
3. Decide how to combine the changes while preserving the intended behavior.
4. Remove the conflict markers and save the files.
5. Stage the resolved files and complete the merge.

  git add &lt;conflicted-file&gt;
   git commit

Run unit and integration tests.
Push the updated branch and allow CI to run again.

To reduce conflicts, developers should keep branches short-lived, pull or fetch changes frequently, communicate about shared files, and submit small pull requests.

Collaboration in a distributed team
This workflow supports team members working in different locations and time zones.

- Independent development: Feature branches let developers work simultaneously without destabilizing main.
- Asynchronous reviews: Pull requests provide a written record of code changes, feedback, and decisions, allowing reviews without everyone being online at the same time.
- Consistent quality: Automated checks apply the same standards to contributions from every developer.
- Transparency: Commits, branches, PR discussions, and review history show who changed what and why.
- Reduced integration risks: Frequent updates and automated tests identify incompatible changes earlier.
- Clear ownership: Code owners and assigned reviewers make responsibilities explicit.
- Secure collaboration: Repository permissions, protected branches, secret scanning, and least-privilege access help protect the codebase.

The team should document coding standards, commit-message conventions, branch naming, test requirements, review expectations, and merge policies in the repository's CONTRIBUTING.md file.

Summary of the workflow
Create a feature branch
Start from the latest main and isolate the work.

Commit and push changes
Use clear commits and publish the feature branch.

Open a pull request
Request peer review and run required CI checks.
Resolve feedback and pass tests
Address comments, conflicts, and any failed checks.
Merge into main
Merge only after all required reviews and checks succeed.

Conclusion
A feature-branch Git workflow combined with pull requests, peer reviews, and automated integration testing helps a team develop a web application safely and efficiently. It allows distributed developers to work independently while maintaining a stable main branch. Consistent merge and rebase policies, clear communication, and branch protection further reduce integration problems and improve software quality.

Task 3: Automate Code Quality and Deployment
CI/CD Integration: To ensure code quality and rapid iteration, the team wants to integrate Git with a Continuous Integration/Continuous Deployment (CI/CD) pipeline. You are tasked with setting up automated tests that run every time a new feature branch is pushed.

Use tools Using GitHub Actions to set up the pipeline. Ensure that the pipeline automatically runs unit tests, checks for code quality, and deploys changes to a staging environment when they pass.

Deliverable: Implement a CI/CD pipeline using Git integration. Provide documentation that explains how the pipeline works, how to trigger tests, and how to deploy new code.
Task 3: Automate Code Quality and Deployment Using GitHub Actions
For your Critical-Thinking-Project repository, you can implement a CI/CD pipeline using GitHub Actions. The pipeline will automatically test your application, check code quality, and deploy successful changes to a staging environment.
You will complete two deliverables:

1. A GitHub Actions workflow file: .github/workflows/ci.yml
2. Documentation explaining how the pipeline works, how to trigger tests, and how to deploy new code.
Step 1: Understand how the pipeline works
3. Developer pushes a feature branch
Git → GitHub

4. GitHub Actions starts the pipeline
Triggered by a push or pull request

5. Run tests
Unit tests

6. Check quality
Linting and validation

7. Review and merge
Only merge after required checks pass

8. Deploy to staging
Automatically after successful checks on main

Important: Because your project is a web application, the exact test and deployment commands depend on its technology. The example below is for a basic HTML, CSS, and JavaScript project. It validates the files and deploys the static site to GitHub Pages as a staging-style environment. If your project uses Node.js, Python, or a cloud hosting service, the testing and deployment steps will need to be adapted.
Step 2: Create the GitHub Actions workflow
Open PowerShell in your existing repository:
cd C:\Users\hp\Documents\Workspace\Critical-Thinking-Project

Create the workflow directory and file:
New-Item -ItemType Directory -Force .github\workflows
notepad .github\workflows\ci.yml

If Notepad does not open, run:
notepad.exe .github\workflows\ci.yml

Copy the following YAML into the file and save it.

```yaml
name: Web Application CI/CD ```

on:
  push:
    branches:
      - "feature/**"
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read

jobs:
  test-and-quality:
    name: Unit Tests and Code Quality
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test

      - name: Check code quality
        run: npm run lint

      - name: Build staging files
        run: npm run build

      - name: Upload website artifact
        if: github.event_name != 'pull_request'
        uses: actions/upload-artifact@v4
        with:
          name: staging-site
          path: public/

  deploy-staging:
    name: Deploy to Staging
    needs: test-and-quality
 if: github.event_name != 'pull_request' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    permissions:
      contents: read
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Download website artifact
        uses: actions/download-artifact@v4
        with:
          name: staging-site
          path: public/

      - name: Configure GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public/

      - name: Deploy to staging site
        id: deployment
        uses: actions/deploy-pages@v4

        The pipeline runs when a feature/** branch or main receives a push, when a pull request targets main, or when you manually start it. A pull request runs the checks but does not deploy.
Step 3: Prepare the application
The workflow above expects a Node.js project containing a package.json, a lock file named package-lock.json, and a public directory produced by the build command.
If these files are not in your repository yet, the workflow will fail until you add them.
Your package.json must define the commands the pipeline uses. For example:
{
  "name": "critical-thinking-project",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test": "node --test",
    "lint": "html-validate \"public/**/*.html\"",
    "build": "node scripts/build.js"
  },
  "devDependencies": {
    "html-validate": "^10.0.0"
  }
}

This is a starting example, not a complete application. You must create scripts/build.js to generate public/, and add actual unit tests. For a plain static HTML project, the build script can simply copy your site files into public/.
After creating package.json, run these commands locally to create the lock file and install dependencies:
npm install

Then create a test file, for example test/app.test.js, with a basic unit test:
const test = require('node:test');
const assert = require('node:assert/strict');

test('application arithmetic works correctly', () => {
  assert.equal(2 + 2, 4);
});

Because this test uses CommonJS syntax, make sure your project is configured for CommonJS (or use the appropriate module syntax for your project). The test is only a starter example; replace it with tests that check your application's real functionality.
For a real web application, your unit tests should verify things such as form validation, product calculations, login logic, or order processing.
Step 4: Configure GitHub Pages
The deployment job requires GitHub Pages to be enabled.

1. Open your repository on GitHub.
2. Go to Settings → Pages.
3. Under Build and deployment, select GitHub Actions as the source.
4. Save the settings if prompted.
The workflow publishes the public/ directory as a website. GitHub Pages is a public hosting service, so this provides a staging-style deployment rather than an isolated private staging server. Do not publish secrets or confidential data in public/.
Step 5: Commit and push the workflow
In PowerShell, run these commands from your repository:
git status
git add .github/workflows/ci.yml
git add package.json package-lock.json test scripts public
git commit -m "Add automated CI/CD pipeline"
git push origin main

Run the git add commands for the application files only after creating them. If you have not created the test, scripts, or public folders yet, complete Step 3 first.
If Git rejects the push because the remote branch has new commits, do not force-push. Resolve the changes first:
git pull --rebase origin main
git push origin main

If Git reports conflicts, resolve them before continuing.
Step 6: Trigger and verify automated tests

A. Create a feature branch
git switch -c feature/automated-tests

Make a code change, then commit and push:
git add .
git commit -m "Add automated test changes"
git push -u origin feature/automated-tests

B. Check the workflow
Open your GitHub repository and select Actions. Open the Web Application CI/CD workflow run.
Confirm that the unit tests, code-quality checks, and build steps pass.

C. Create a pull request
Open a pull request from feature/automated-tests into main. Review the changes and confirm the checks pass before merging.

D. Deploy the updated application
After merging the feature into main, the workflow runs again. If all tests, quality checks, and the build succeed, the deployment job publishes the website.
Find the deployment URL in the successful run or under the repository's Deployments section.

Step 7: Document the pipeline
Create a Markdown file named CI-CD-Documentation.md in your repository root:
notepad.exe CI-CD-Documentation.md

Copy this documentation into the file.
CI/CD Pipeline Implementation and Documentation

1. Introduction
This project implements a Continuous Integration and Continuous Deployment (CI/CD) pipeline using Git, GitHub, and GitHub Actions. The purpose is to automate software testing, code quality checks, and deployment to a staging-style website environment.
The pipeline reduces manual work, identifies errors early, and improves the reliability and speed of software delivery.
2. Tools and Technologies

- Git: Tracks source-code changes.
- GitHub: Hosts the repository and supports collaboration.
- GitHub Actions: Automates testing, validation, and deployment.
- Node.js: Runs the project's JavaScript tests and scripts.
- npm: Installs dependencies and runs project scripts.
- HTML Validate: Checks HTML files for markup errors.
- GitHub Pages: Hosts the deployed static website.

1. Pipeline Configuration
The workflow is stored in .github/workflows/ci.yml.
It is triggered by:

- Pushes to feature branches matching feature/**.
- Pushes to the main branch.
- Pull requests targeting main.
- Manual execution through the GitHub Actions interface.

1. Pipeline Stages
Stage 1: Source Code Checkout
GitHub Actions checks out the repository so the runner can access the latest source code.
Stage 2: Dependency Installation
The workflow uses npm ci to install the dependencies specified by the project's lock file.
Stage 3: Automated Unit Testing
The workflow runs npm test to execute the application's unit tests. These tests help identify defects before code is integrated or deployed.
Stage 4: Code Quality Checks
The workflow runs npm run lint to validate the project's HTML markup and identify quality issues.
Stage 5: Build
The workflow runs npm run build to prepare the files required for deployment. The build must generate the website in the public/ directory.
Stage 6: Artifact Creation
The workflow uploads the generated website as a build artifact. The deployment job retrieves this artifact instead of rebuilding the application.
Stage 7: Staging Deployment
When the pipeline runs successfully on main, GitHub Actions publishes the website through GitHub Pages.
Pull requests run the validation and build stages but do not deploy the website.
2. How to Trigger Tests
Developers create a feature branch, make their changes, and push the branch to GitHub.
Example commands:
git switch -c feature/new-feature
git add .
git commit -m "Add new feature"
git push -u origin feature/new-feature
GitHub Actions automatically starts the workflow. Developers can view its progress and results under the repository's Actions tab.
3. How to Deploy New Code
4. Create a feature branch.
5. Implement and test the changes.
6. Commit and push the changes to GitHub.
7. Open a pull request targeting main.
8. Review the code and ensure all required checks pass.
9. Merge the pull request.
10. Allow GitHub Actions to execute the pipeline on main.
11. Verify that the deployment job succeeds and open the published website.
Deployment occurs automatically only after the required checks and build succeed.
12. Failure Handling
If a unit test, quality check, or build fails, the dependent deployment job does not run.
The developer should inspect the failed job logs, correct the problem, commit the fix, and push again. GitHub Actions will rerun the workflow.
13. Security and Best Practices

- Protect the main branch.
- Require pull requests and successful status checks before merging.
- Use least-privilege workflow permissions.
- Keep credentials and tokens out of source code.
- Store necessary deployment secrets in GitHub Secrets or environment secrets.
- Use automated tests and code reviews to reduce defects.
- Pin third-party actions to verified commit SHAs when stronger supply-chain security is required.
- Never publish confidential information through GitHub Pages.
Expected Results
The completed pipeline should automatically test and validate feature-branch changes, verify pull requests, build the application, and deploy successful changes merged into main.
This approach improves development efficiency, catches defects earlier, and provides a repeatable deployment process.
Conclusion
Integrating GitHub Actions into the software development workflow reduces manual testing and deployment effort. Automated checks improve code quality, while deployment automation makes successful releases more consistent and reliable.

Step 8: Commit the documentation
git add CI-CD-Documentation.md
git commit -m "Document CI/CD pipeline implementation"
git push origin main

Final verification checklist
Task completion
0 of 9
[ ] Created .github/workflows/ci.yml
[ ] Added package.json and package-lock.json
[ ] Implemented actual unit tests
[ ] Configured code-quality checks
[ ] Created a build that generates public/
[ ] Enabled GitHub Pages using GitHub Actions
[ ] Pushed the workflow and documentation to GitHub
[ ] Verified a successful feature-branch workflow
[ ] Verified a successful deployment from main

Important: The YAML and documentation provide the pipeline structure, but a successful deployment depends on the application scripts, tests, build output, and GitHub Pages configuration actually being present. Verify these in your repository before reporting the task as fully implemented.

# Deliverable: Implement a CI/CD Pipeline Using Git Integration

## 1. Introduction

Continuous Integration and Continuous Deployment (CI/CD) automate the process of testing, validating, and deploying software changes. For the Critical-Thinking-Project web application, Git is used for version control, while GitHub Actions automates testing, code-quality checks, and website deployment.

The pipeline helps identify errors early, reduces manual work, and ensures that only changes that pass the required checks are deployed.

## 2. Tools and Technologies

The pipeline uses the following tools:

- **Git:** Tracks changes and manages branches and commits.
- **GitHub:** Hosts the repository and supports collaboration through pull requests.
- **GitHub Actions:** Runs automated workflows when code is pushed or a pull request is opened.
- **Node.js and npm:** Install project dependencies and run tests and quality checks.
- **Vitest:** Executes automated JavaScript unit tests.
- **ESLint:** Checks JavaScript code quality.
- **markdownlint-cli2:** Checks Markdown documentation.
- **HTML-Validate:** Validates HTML files.
- **Stylelint:** Checks CSS code quality.
- **GitHub Pages:** Hosts the static website.

## 3. CI/CD Pipeline Configuration

The workflow is stored in:

`.github/workflows/ci.yml`

The pipeline consists of three jobs:

### Job 1: Quality Checks

The quality job:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs dependencies using `npm ci`.
4. Runs unit tests using `npm test`.
5. Runs Markdown, JavaScript, HTML, and CSS lint checks using `npm run lint`.
6. Checks for whitespace errors using `git diff --check`.

If any required command fails, the quality job fails and the dependent deployment jobs do not proceed.

### Job 2: Build and Prepare the Website

After the quality job succeeds, the build job:

1. Configures GitHub Pages.
2. Packages the contents of the `site/` directory as a deployment artifact.

The website files are prepared for publication without requiring a separate manual upload.

### Job 3: Deploy the Website

The deployment job runs only when code is pushed to the `main` branch and the preceding jobs succeed. It publishes the prepared website to GitHub Pages using the GitHub Actions deployment process.

## 4. Pipeline Triggers

The workflow is configured to run in these situations:

- **Push to `main`:** Runs checks and, if successful, deploys the website.
- **Push to a `feature/**` branch:** Runs the quality checks and prepares the website artifact; it does not deploy to the live website.
- **Pull request targeting `main`:** Runs quality checks to help prevent defective code from being merged.
- **Manual trigger:** Allows a workflow run to be started from the GitHub Actions interface.

## 5. How to Trigger Automated Tests

### Method A: Run tests locally

Open PowerShell in the project directory and execute:

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run lint
```
The test command runs the unit tests defined in the `tests/` directory. The lint command checks Markdown, JavaScript, HTML, and CSS.

### Method B: Trigger tests through Git

After making a change, stage and commit it on a feature branch:

```powershell
git switch -c feature/example-update
git add .
git commit -m "test: verify CI pipeline"
git push -u origin feature/example-update
```
Replace the example change with the actual files you intend to commit. Review `git status` before staging to avoid including unwanted backup files or nested repositories.

Pushing the branch triggers GitHub Actions automatically. Open the repository's **Actions** tab to review the workflow run and inspect any failed step.

### Method C: Test a pull request

1. Push the feature branch to GitHub.
2. Open the repository and select **Pull requests**.
3. Create a pull request from the feature branch into `main`.
4. Wait for the automated checks to complete.
5. Review the results and fix any failures before merging.

## 6. How to Deploy New Code

To deploy a website update:

1. Create a feature branch.
2. Edit the website files in the `site/` directory.
3. Run the tests and lint checks locally.
4. Commit and push the changes.
5. Open a pull request targeting `main`.
6. Review the changes and ensure the required checks pass.
7. Merge the pull request into `main`.
8. GitHub Actions runs the pipeline on the updated `main` branch.
9. After successful quality and build jobs, the deployment job publishes the website to GitHub Pages.
10. Open the published website and verify that the changes appear correctly.

Website URL:
<https://ishaqsalimon-commits.github.io/Critical-Thinking-Project/>

The URL will work once GitHub Pages is configured and the first deployment completes successfully.

## 7. Security and Best Practices

The pipeline follows these practices:

- Keep GitHub Actions permissions limited to the permissions required by each job.
- Use pull requests and code reviews to control changes to `main`.
- Never commit passwords, access tokens, private SSH keys, or other secrets.
- Keep dependencies updated and review dependency changes.
- Investigate failed tests and lint checks before merging.
- Protect the `main` branch with appropriate branch protection rules.
- Review deployment logs in GitHub Actions when troubleshooting.

## 8. Testing and Verification

The pipeline can be verified by making a small change and pushing it to a feature branch. Confirm that GitHub Actions starts automatically, that the unit tests and lint checks complete successfully, and that the pull request displays the check results.

After merging the change into `main`, verify that the deployment job succeeds and that the updated website is available on GitHub Pages.

Record the actual workflow results and any screenshots required by the assignment. Do not report a successful deployment until the deployment job has completed successfully.

## 9. Conclusion

The CI/CD pipeline integrates Git version control with automated testing, code-quality checks, artifact preparation, and GitHub Pages deployment. It supports a feature-branch workflow, helps identify defects before merging, and automates publication of approved changes to the live website. This improves release consistency, reduces manual effort, and supports reliable software delivery.

Task 4: Enforce Security Best Practices
Scenario: With distributed teams, securing the source code repository is critical. You need to enforce security measures that ensure that sensitive data is protected and unauthorized changes cannot be made to the codebase.

Implement security best practices in Git, including setting up user access controls, managing SSH keys, enforcing branch protection, and using signed commits for critical code changes.

Ensure that there is a mechanism for auditing changes, so all code changes can be tracked and verified.

Deliverable: Set up security best practices in your Git repository. Document how you configured access controls, enabled branch protection, and enforced commit signing. Explain how this ensures the security and integrity of the codebase.
