# CLAUDE.md

Hard rules for AI coding assistants working in this repository.

## Content

- Do not add code, configuration, account IDs, ARNs, hostnames, queue names, screenshots or company names from any current or previous employer. Write generic examples from scratch.
- Every claim in a README must be true for the code in this repository.
- Do not add benchmark numbers unless they were measured in this repository and the README shows how.
- If something is not done, write "not done". Do not commit placeholder text or to-do markers.
- Do not use these words or claims: "zero downtime", "GitOps", "production-grade", "enterprise-grade", "battle-tested", "sole owner", "founding".
- Do not name tools or services that the code in this repository does not use.

## README style

- Plain, short sentences. No emojis, badge walls or marketing adjectives.
- Sections: Overview, Architecture, How to run, Design decisions, Limitations.

## Git and secrets

- Use the global git identity. Check `git config user.name` and `git config user.email` before the first commit. Do not set a repository-level identity.
- Never commit `.tfstate` files, `.terraform/`, `.env` files, credentials or keys.
- Keep the gitleaks pre-commit hook installed (`pre-commit install`).
- Run `gitleaks git --redact .` before every push.

## Ask first

- Force-push, renaming or deleting a repository, changing visibility.
- `terraform apply`, or anything else that costs money.
- Any change to GitHub account settings.
