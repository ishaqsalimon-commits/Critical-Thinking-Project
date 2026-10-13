# Git Team Workflow

## 1. Create a feature branch
Start from the latest main branch and create a separate branch for each feature.

## 2. Commit and push changes
Use descriptive commit messages and push your feature branch to GitHub.

## 3. Open a pull request
Create a pull request targeting main and explain the purpose of the changes.

## 4. Review and test
Request peer reviews and require automated tests and code-quality checks to pass.

## 5. Resolve conflicts
Resolve merge conflicts carefully, stage the resolved files, and rerun tests.

## 6. Merge changes
Merge into main only after required reviews and CI checks succeed.

## 7. Deploy and verify
Deploy approved changes to staging and verify them before production release.

## Branching and security rules
- Use feature branches for new work.
- Protect main against direct pushes.
- Never commit passwords, tokens, or secrets.
- Keep pull requests small and focused.
- Rebase only your own feature branch when appropriate.
- Never rewrite published main history.
