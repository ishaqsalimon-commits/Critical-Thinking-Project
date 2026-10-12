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

6. Run unit and integration tests.
7. Push the updated branch and allow CI to run again.

To reduce conflicts, developers should keep branches short-lived, pull or fetch changes frequently, communicate about shared files, and submit small pull requests.

8. Collaboration in a distributed team
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
