# CLAUDE.md

## What this repo is

Personal portfolio site: an Astro static build hosted on S3 behind CloudFront. The infrastructure is Terraform in `terraform/`. Site facts live in `src/data/profile.ts`. The contact form endpoint is `FORMSPREE_ENDPOINT` in the same file.

## Build, test, run

- `npm ci`, then `npm run dev` for local development.
- `npm run build` writes the static site to `dist/`. `npm run preview` serves it.
- There are no automated tests. Lint workflows with `actionlint`.
- Terraform: run `terraform fmt -check`, `terraform validate` and `terraform plan` in `terraform/`. `terraform/bootstrap/README.md` covers the state backend.

## Deploy

`.github/workflows/deploy.yml` runs only on manual dispatch. It builds the site, assumes an AWS role through GitHub OIDC, syncs `dist/` to S3 and invalidates CloudFront.

## Secrets

- Never commit `.tfstate` files, `.terraform/`, `.env` files, `terraform.tfvars`, credentials or keys.
- Run `gitleaks git --redact .` before every push.
