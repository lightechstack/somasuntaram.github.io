# portfolio

Static portfolio site. Astro → S3 → CloudFront, provisioned with Terraform,
deployed via GitHub Actions using OIDC (no long-lived AWS keys in the repo).

## Structure

```
src/pages/          Astro pages (index, /work, 5 case studies)
terraform/          Infra: S3, CloudFront + OAC, ACM, Route53, GitHub OIDC role
.github/workflows/  Build + deploy pipeline
```

## Status

Infra scaffold: complete, not yet deployed.
Case study content: 1 of 5 written (`portfolio-infra`). The other 4 are
explicitly blocked in-page pending resume fact-checks — see each page's
`.blocked` box for the exact open item. Do not fill those with placeholder
copy; the point of stubbing them is to force the fact-check before the
prose gets written.

## First-time setup

1. `terraform/bootstrap/README.md` — create the state bucket + lock table
   (can't be Terraform-managed on the first run).
2. Fill in `backend "s3"` in `terraform/versions.tf`.
3. `terraform init && terraform plan` in `terraform/` with `-var domain_name=...`
   and `-var github_repo=owner/repo`.
4. After apply, set repo secrets: `AWS_DEPLOY_ROLE_ARN` (from the
   `github_deploy_role_arn` output), `SITE_BUCKET_NAME`,
   `CLOUDFRONT_DISTRIBUTION_ID`.
5. Update `site` in `astro.config.mjs` to the real domain.
6. Add `public/resume.pdf`.

## Local dev

```bash
npm install
npm run dev
```
