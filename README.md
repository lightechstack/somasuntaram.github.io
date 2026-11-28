# portfolio

Static portfolio site. Astro → S3 → CloudFront, provisioned with Terraform,
deployed via GitHub Actions using OIDC (no long-lived AWS keys in the repo).

## Structure

```
src/pages/          Astro pages (index, contact, /work, 4 case studies)
public/contact.js   Contact form validation, submit and result message
terraform/          Infra: S3, CloudFront + OAC, ACM, Route53, GitHub OIDC role
.github/workflows/  Build + deploy pipeline
```

## Status

Work in progress. The infrastructure code is written but not yet deployed.
Four case studies are in `src/pages/work/`.

The contact form posts to Formspree (`FORMSPREE_ENDPOINT` in
`src/data/profile.ts`). Not done: a delivery test from the deployed site.

Deployment runs only when triggered manually (`workflow_dispatch`).

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
6. To use a different Formspree form, set `FORMSPREE_ENDPOINT` in
   `src/data/profile.ts` to its endpoint (`https://formspree.io/f/<id>`).

## Local dev

```bash
npm install
npm run dev
```
